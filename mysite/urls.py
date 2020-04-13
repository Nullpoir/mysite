"""nullab.xyz URL 設定
SPA
"""
from django.contrib import admin
from django.urls import path,include
from django.conf.urls import url
from django.core.cache import cache
import mysite.settings as conf
from django.conf.urls.i18n import i18n_patterns
from django.views.generic import TemplateView
from .sitemap import ArticleSitemap,ToppageSitemap
from django.contrib.sitemaps.views import sitemap
#from filebrowser.sites import site
from article.restful.api_urls import article_router,category_router,tag_router
import article.restful.api_views as api_views
from article import views

sitemaps = {
    'top':ToppageSitemap,
    'article': ArticleSitemap,
}


api_urlpatterns = [
    path('article/', include(article_router.urls)),
    path('comment/',api_views.CommentView.as_view()),
    path('category/',include(category_router.urls)),
    path('tag/',include(tag_router.urls)),
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('ckeditor/', include('ckeditor_uploader.urls')),
    path('filebrowser_filer/', include('ckeditor_filebrowser_filer.urls')),
    path('spa/1.0/', include(api_urlpatterns)),
    path('sitemap.xml/', sitemap, {'sitemaps': sitemaps},  name='sitemap'),
    url(r'^',views.SinglePageView,name="index")
]
