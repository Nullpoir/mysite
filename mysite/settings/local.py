from .base import *

DEBUG = True
#secret values

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY')
TWITTER_ENABLED = os.environ.get("TWITTER_ENABLED")
#Email
EMAIL_USE_TLS = True
EMAIL_HOST = os.environ.get('EMAIL_HOST')
EMAIL_HOST_USER = os.environ.get('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD')
EMAIL_PORT = 587
EMAIL_BACKEND = os.environ.get('EMAIL_BACKEND')

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
CELERY_RESULT_BACKEND = "django-db"
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'app.restful.pagination.MyPagination',
    'PAGE_SIZE': 2,
    'ORDERING': "pub_date",
    'DEFAULT_RENDERER_CLASSES': (
        'djangorestframework_camel_case.render.CamelCaseJSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ),
    'DEFAULT_PARSER_CLASSES': (
        'djangorestframework_camel_case.parser.CamelCaseJSONParser',
        'rest_framework.parsers.FormParser',
        'rest_framework.parsers.MultiPartParser'
    ),
    'DEFAULT_FILTER_BACKENDS': ('django_filters.rest_framework.DjangoFilterBackend',),
    'TEST': {
            'NAME': 'test_db',
        }
}

MEDIA_ROOT=os.path.join(BASE_DIR,"media")
CKEDITOR_UPLOAD_PATH = MEDIA_ROOT+"/uploads/"
