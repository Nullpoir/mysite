from django.contrib.sitemaps import Sitemap
from django.shortcuts import resolve_url
from article.models import Article

class ToppageSitemap(Sitemap):
    changefreq = "daily"
    priority = 0.9
    def items(self):
        return ['/']

    def location(self, obj):
        return resolve_url(obj)

class ArticleSitemap(Sitemap):
    changefreq = "monthly"
    priority = 0.5

    def items(self):
        return Article.objects.published()

    def location(self, obj):
        return resolve_url('/article/'+str(obj.pk))

    def lastmod(self, obj):
        return obj.pub_date
