from rest_framework.routers import DefaultRouter

from . import api_views
article_router = DefaultRouter()
article_router.register('',api_views.ArticleView)

category_router = DefaultRouter()
category_router.register('',api_views.CategoryView)
