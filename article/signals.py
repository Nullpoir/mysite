from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Article
import datetime
from pytz import timezone
from article.tasks import scheduled_worker
from django.db.models import signals
from celery.task.control import revoke
from contextlib import contextmanager
from article.utils.twitter.twitter_post import twitter_publisher
import os
from django.conf import settings

# receiverを作動させないwith作成
@contextmanager
def disable_signal(signal, receiver, sender=None, weak=True, dispatch_uid=None):
    signal.disconnect(receiver, sender, dispatch_uid=dispatch_uid)
    yield
    signal.connect(receiver, sender, weak=weak, dispatch_uid=dispatch_uid)

@receiver(post_save, sender=Article)
def sns_publish_handler(sender, instance, created, **kwargs):
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
