from mysite.settings.celery import app
from article.utils.twitter.twitter_post import twitter_publisher

@app.task
def scheduled_worker(title,pk,text):
    twitter_publisher(title,pk,text)
