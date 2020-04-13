from __future__ import absolute_import, unicode_literals
from celery import Celery
import os

# set the default Django settings module for the 'celery' program.
if os.environ.get('Production') != None:
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings.production")
else:
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings.local")

app = Celery('mysite')
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registere
app.autodiscover_tasks()
