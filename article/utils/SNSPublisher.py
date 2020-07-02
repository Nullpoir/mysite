from article.utils.twitter.twitter_post import twitter_publisher
import os
from django.conf import settings
import datetime
from pytz import timezone
import os
from celery.task.control import revoke
from article.tasks import scheduled_worker

def sns_publish_handler(instance):
    now = datetime.datetime.now(timezone('Asia/Tokyo'))
    pub_date = instance.pub_date
    pub_type = instance.pub_type
    is_need = instance.is_need_celery_change
    if settings.TWITTER_ENABLED == "False":
        print("Server will not tweet.")
        return 0
    if settings.DEBUG:
        print(
            "Server will publish",
            "\npublished at:",
            instance.pub_date,
            "\ntitle:",
            instance.title,
            "\npk:",
            instance.pk,
            "\nsns_intro:",
            instance.sns_intro,
            "is_need_celery_change:",
            instance.is_need_celery_change
        )
        return 0

    if (pub_date <= now) and (pub_type == 1) and is_need:
        #もし登録済みCeleryタスクがあるなら破棄
        if instance.celery_id != None:
            revoke(instance.celery_id,terminate=True)
            with disable_signal(signals.post_save, sns_publish_handler, Article):
                instance.celery_id = None
                instance.save()

        #ツイート
        twitter_publisher(instance.title,instance.pk,instance.sns_intro)
    elif (pub_date > now) and (pub_type == 1) and is_need:
        #もし登録済みCeleryタスクがあるなら破棄
        if instance.celery_id != None:
            revoke(instance.celery_id,terminate=True)

        #celery登録
        task_result = scheduled_worker.apply_async((instance.title,instance.pk,instance.sns_intro),eta=pub_date)
        with disable_signal(signals.post_save, sns_publish_handler, Article):
            instance.celery_id = task_result
            instance.save()
    else:
        #何もしない
        pass