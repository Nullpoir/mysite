from django.shortcuts import render,HttpResponseRedirect,get_object_or_404,Http404
from django.http import HttpResponse,JsonResponse
from mysite import settings
from django.core.mail import send_mail
from django.template.loader import get_template
from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator
from django.db.models import Q
from django.views import generic
import json
from app.models import app,Tag
from app.helpers.ogp import get_ogp_tags

# メール送信関数
def mail(subject, message, from_email, to_mail="nullpoir0805@gmail.com",**kwargs):
    send_mail(subject, message, from_email, [to_mail], **kwargs)

# 問い合わせフォームのview関数
def inquiry(request):
    if request.method == "POST":
        body = json.loads(request.body)
        name = body["name"]
        email = body["email"]
        text = body["text"]
        # print(request.body)

        message = name + "\n" + email + "\n" + text

        mail("ブログコメ",message,"nullab_system",["nullpoir0805@gmail.com"])
        return HttpResponse("")
    else:
        raise Http404

# なんちゃってSSRとSPAの提供
def single_page_view(request):
    request_url = request.path
    prefix = "prefix=\"og: http://ogp.me/ns\# fb: http://ogp.me/ns/fb\# website: http://ogp.me/ns/websaite\#\""
    try:
        if request_url.split("/")[1] == "app":
            app_pk = int(request_url.split("/")[2])
            app = app.objects.get(pk=app_pk)
            OGP_HEADER = get_ogp_tags(
                app.title,
                "https://nullab.xyz"+request_url,
                "https://nullab.xyz"+app.thumbnail_url(),
                "nullab","app","nullabの記事"
            )
            print(OGP_HEADER)
            return render(request,"index.html",{"SEO_HEADER":OGP_HEADER,"PREFIX":prefix})
        else:
            return render(request,"index.html")
    except:
        return render(request,"index.html")
