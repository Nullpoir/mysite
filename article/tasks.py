from mysite.settings.celery import app
from article.utils.twitter.twitter_post import twitter_publisher
import os
from django.conf import settings

@app.task
def scheduled_worker(title,pk,text):
    twitter_publisher(title,pk,text)
