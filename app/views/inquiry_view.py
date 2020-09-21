from django.shortcuts import render,HttpResponseRedirect,get_object_or_404,Http404
from django.http import HttpResponse,JsonResponse
from mysite import settings

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

# メール送信関数
def mail(subject, message, from_email, to_mail="nullpoir0805@gmail.com",**kwargs):
    send_mail(subject, message, from_email, [to_mail], **kwargs)
