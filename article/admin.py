from django.contrib import admin
from .models import Article
from .models import Tag,Comment,Category
from django import forms
from datetime import datetime

from filer.models.foldermodels import Folder
from .CustomAdmins import CustomFolderAdmin

admin.site.unregister(Folder)
admin.site.register(Folder,CustomFolderAdmin)

class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title','pub_date','pub_type','pv')
    list_filter = ('tags',)
    search_fields = ('title',)
    list_per_page = 20
    filter_horizontal = ('tags',)
    exclude = ('body','index','meta','celery_id','is_need_celery_change','pv',)
    #form = TagSuggestForm

# Register your models here.
admin.site.register(Article,ArticleAdmin)
admin.site.register(Tag)
admin.site.register(Category)
admin.site.register(Comment)

admin.site.site_title = 'nullab管理画面'
admin.site.site_header = 'nullab管理'
admin.site.index_title = 'メニュー'
