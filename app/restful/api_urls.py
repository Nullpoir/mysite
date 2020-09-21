from rest_framework.routers import DefaultRouter

from . import api_views
app_router = DefaultRouter()
app_router.register('',api_views.appView)

category_router = DefaultRouter()
category_router.register('',api_views.CategoryView)
