#長
from filer.admin.folderadmin import FolderAdmin
from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator
from filer.models import (
    File, Folder, FolderPermission, FolderRoot, ImagesWithMissingData,
    UnsortedImages, tools,
)
from filer.settings import FILER_IMAGE_MODEL, FILER_PAGINATE_BY
from django.contrib.admin import helpers
from django.utils.translation import ugettext_lazy, ungettext
from filer import settings
from filer.admin.tools import (
    AdminContext, admin_url_params_encoded, check_files_edit_permissions,
    check_files_read_permissions, check_folder_edit_permissions,
    check_folder_read_permissions, popup_status, userperms_for_request,
)
from django.utils.translation import ugettext as _
from django.utils.http import urlquote, urlunquote
from django.urls import reverse
from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse, HttpResponseRedirect
import re

class CustomFolderAdmin(FolderAdmin):
    def directory_listing(self, request, folder_id=None, viewtype=None):
        clipboard = tools.get_user_clipboard(request.user)
        if viewtype == 'images_with_missing_data':
            folder = ImagesWithMissingData()
        elif viewtype == 'unfiled_images':
            folder = UnsortedImages()
        elif viewtype == 'last':
            last_folder_id = request.session.get('filer_last_folder_id')
            try:
                self.get_queryset(request).get(id=last_folder_id)
            except self.model.DoesNotExist:
                url = reverse('admin:filer-directory_listing-root')
                url = "%s%s" % (url, admin_url_params_encoded(request))
            else:
                url = reverse('admin:filer-directory_listing', kwargs={'folder_id': last_folder_id})
                url = "%s%s" % (url, admin_url_params_encoded(request))
            return HttpResponseRedirect(url)
        elif folder_id is None:
            folder = FolderRoot()
        else:
            folder = get_object_or_404(self.get_queryset(request), id=folder_id)
        request.session['filer_last_folder_id'] = folder_id

        # Check actions to see if any are available on this changelist
        actions = self.get_actions(request)

        # Remove action checkboxes if there aren't any actions available.
        list_display = list(self.list_display)
        if not actions:
            try:
                list_display.remove('action_checkbox')
            except ValueError:
                pass

        # search
        q = request.GET.get('q', None)
        if q:
            search_terms = urlunquote(q).split(" ")
            search_mode = True
        else:
            search_terms = []
            q = ''
            search_mode = False
        # Limit search results to current folder.
        limit_search_to_folder = request.GET.get('limit_search_to_folder',
                                                 False) in (True, 'on')

        if len(search_terms) > 0:
            if folder and limit_search_to_folder and not folder.is_root:
                # Do not include current folder itself in search results.
                folder_qs = folder.get_descendants(include_self=False)
                # Limit search results to files in the current folder or any
                # nested folder.
                file_qs = File.objects.filter(
                    folder__in=folder.get_descendants(include_self=True)).order_by("modified_at").reverse()
            else:
                folder_qs = self.get_queryset(request)
                file_qs = File.objects.all().order_by("modified_at").reverse()
            folder_qs = self.filter_folder(folder_qs, search_terms)
            file_qs = self.filter_file(file_qs, search_terms)

            show_result_count = True
        else:
            folder_qs = folder.children.all()
            file_qs = folder.files.all().order_by("modified_at").reverse()
            show_result_count = False



        folder_children = []
        folder_files = []
        if folder.is_root and not search_mode:
            virtual_items = folder.virtual_folders
        else:
            virtual_items = []

        perms = FolderPermission.objects.get_read_id_list(request.user)
        root_exclude_kw = {'parent__isnull': False, 'parent__id__in': perms}
        if perms != 'All':
            file_qs = file_qs.filter(models.Q(folder__id__in=perms) | models.Q(owner=request.user)).order_by("modified_at").reverse()
            folder_qs = folder_qs.filter(models.Q(id__in=perms) | models.Q(owner=request.user))
        else:
            root_exclude_kw.pop('parent__id__in')
        if folder.is_root:
            folder_qs = folder_qs.exclude(**root_exclude_kw)

        folder_children += folder_qs
        folder_files += file_qs
        print(folder_files)

        try:
            permissions = {
                'has_edit_permission': folder.has_edit_permission(request),
                'has_read_permission': folder.has_read_permission(request),
                'has_add_children_permission':
                    folder.has_add_children_permission(request),
            }
        except:  # noqa
            permissions = {}


        items = folder_children + folder_files
        paginator = Paginator(items, FILER_PAGINATE_BY)

        # Are we moving to clipboard?
        if request.method == 'POST' and '_save' not in request.POST:
            # TODO: Refactor/remove clipboard parts
            for f in folder_files:
                if "move-to-clipboard-%d" % (f.id,) in request.POST:
                    clipboard = tools.get_user_clipboard(request.user)
                    if f.has_edit_permission(request):
                        tools.move_file_to_clipboard([f], clipboard)
                        return HttpResponseRedirect(request.get_full_path())
                    else:
                        raise PermissionDenied

        selected = request.POST.getlist(helpers.ACTION_CHECKBOX_NAME)
        # Actions with no confirmation
        if (
            actions and request.method == 'POST'
            and 'index' in request.POST
            and '_save' not in request.POST
        ):
            if selected:
                response = self.response_action(request, files_queryset=file_qs, folders_queryset=folder_qs)
                if response:
                    return response
            else:
                msg = _("Items must be selected in order to perform "
                        "actions on them. No items have been changed.")
                self.message_user(request, msg)

        # Actions with confirmation
        if (
            actions and request.method == 'POST'
            and helpers.ACTION_CHECKBOX_NAME in request.POST
            and 'index' not in request.POST
            and '_save' not in request.POST
        ):
            if selected:
                response = self.response_action(request, files_queryset=file_qs, folders_queryset=folder_qs)
                if response:
                    return response

        # Build the action form and populate it with available actions.
        if actions:
            action_form = self.action_form(auto_id=None)
            action_form.fields['action'].choices = self.get_action_choices(request)
        else:
            action_form = None

        selection_note_all = ungettext('%(total_count)s selected',
            'All %(total_count)s selected', paginator.count)

        # If page request (9999) is out of range, deliver last page of results.
        try:
            paginated_items = paginator.page(request.GET.get('page', 1))
        except PageNotAnInteger:
            paginated_items = paginator.page(1)
        except EmptyPage:
            paginated_items = paginator.page(paginator.num_pages)

        context = self.admin_site.each_context(request)
        context.update({
            'folder': folder,
            'clipboard_files': File.objects.filter(
                in_clipboards__clipboarditem__clipboard__user=request.user
            ).distinct(),
            'paginator': paginator,
            'paginated_items': paginated_items,
            'virtual_items': virtual_items,
            'uploader_connections': settings.FILER_UPLOADER_CONNECTIONS,
            'permissions': permissions,
            'permstest': userperms_for_request(folder, request),
            'current_url': request.path,
            'title': _('Directory listing for %(folder_name)s') % {'folder_name': folder.name},
            'search_string': ' '.join(search_terms),
            'q': urlquote(q),
            'show_result_count': show_result_count,
            'folder_children': folder_children,
            'folder_files': folder_files,
            'limit_search_to_folder': limit_search_to_folder,
            'is_popup': popup_status(request),
            'filer_admin_context': AdminContext(request),
            # needed in the admin/base.html template for logout links
            'root_path': reverse('admin:index'),
            'action_form': action_form,
            'actions_on_top': self.actions_on_top,
            'actions_on_bottom': self.actions_on_bottom,
            'actions_selection_counter': self.actions_selection_counter,
            'selection_note': _('0 of %(cnt)s selected') % {'cnt': len(paginated_items.object_list)},
            'selection_note_all': selection_note_all % {'total_count': paginator.count},
            'media': self.media,
            'enable_permissions': settings.FILER_ENABLE_PERMISSIONS,
            'can_make_folder': request.user.is_superuser or (folder.is_root and settings.FILER_ALLOW_REGULAR_USERS_TO_ADD_ROOT_FOLDERS) or permissions.get("has_add_children_permission"),
        })
        return render(request, self.directory_listing_template, context)
