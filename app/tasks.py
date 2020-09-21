from mysite.settings.celery import app
from app.helpers.twitter.twitter_post import twitter_post

@app.task
def scheduled_worker(title,pk,text):
    twitter_post(title,pk,text)
