from .base import *

DEBUG = False
#secret values

#Email
EMAIL_USE_TLS = True
EMAIL_HOST = os.environ.get('EMAIL_HOST')
EMAIL_HOST_USER = os.environ.get('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD')
EMAIL_PORT = 587
EMAIL_BACKEND = os.environ.get('EMAIL_BACKEND')

#twitter
TWITTER_ENABLED = os.environ.get("TWITTER_ENABLED")
TWITTER_CONSUMER_KEY = os.environ.get('TWITTER_CONSUMER_KEY')
TWITTER_CONSUMER_SECRET = os.environ.get('TWITTER_CONSUMER_SECRET')
TWITTER_TOKEN = os.environ.get('TWITTER_TOKEN')
TWITTER_TOKEN_SECRET = os.environ.get('TWITTER_TOKEN_SECRET')

DB_NAME = os.environ.get('DB_NAME')
DB_USER = os.environ.get('DB_USER')
DB_PASSWORD = os.environ.get('DB_PASSWORD')

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': DB_NAME,
        'USER': DB_USER,
        'PASSWORD': DB_PASSWORD,
        'HOST': 'localhost',
        'PORT': '',
        }
    }
CELERY_RESULT_BACKEND = 'db+postgresql+psycopg2://postgres:dkkk0805@localhost/nullabdb'

REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'app.restful.pagination.MyPagination',
    'PAGE_SIZE': 8,
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
    'DEFAULT_FILTER_BACKENDS': ('django_filters.rest_framework.DjangoFilterBackend',)
}

# DATABASES = {
# 'default': {
#         'ENGINE': 'django.db.backends.mysql',
#         'NAME': 'mysite',
#         'USER': 'root',
#         'PASSWORD': 'mykw0805',
#         'HOST': 'localhost',
#         'PORT': '8889',
#         'OPTIONS': {
#             'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
# 	        'charset': 'utf8mb4',
#         },
#         'TEST': {
#             'NAME': 'mysite'
#         }
#     }
# }

MEDIA_ROOT=os.path.join(PROJECT_ROOT,"media")
CKEDITOR_UPLOAD_PATH = MEDIA_ROOT+"/uploads/"

FILE_UPLOAD_MAX_MEMORY_SIZE = 5242880
