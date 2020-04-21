from django.db import models
from datetime import datetime
from django.utils import timezone
from django.db.models import Q
from model_utils import FieldTracker
from celery.task.control import revoke
from .utils.meta import MetaContentPublisher
from ckeditor.fields import RichTextField
from filer.fields.image import FilerImageField
from filer.models.imagemodels import Image
from .utils.article_converter import article_convert
from django.core import serializers

#公開タイプ選択ソース
PUB_TYPES=(
    (2,'非公開'),
    (1,'公開')
)

'''
PublishedManager:予約投稿機能
Article.objects.published()でpub_dateが
現在時刻より以前のものだけ拾える。
ついでに新しいのから順に並び替えてくれる。
'''
class PublishedManager(models.Manager):
    use_for_related_fields = True
    def published(self, **kwargs):
        query = Q()
        query.add(Q(pub_date__lte=timezone.now()),Q.AND)
        query.add(Q(pub_type=1),Q.AND)
        return self.filter(query, **kwargs).order_by('pub_date').reverse()

    def not_published(self, **kwargs):
        query = Q()
        query.add(Q(pub_date__gt=timezone.now()),Q.AND)
        query.add(Q(pub_type=1),Q.AND)
        return self.filter(query, **kwargs).order_by('pub_date')

#記事のタグモデル
class Tag(models.Model):
    name = models.CharField('タグ名', max_length=30,unique=True)
    parent = models.ForeignKey(
                'self',
                 verbose_name='親タグ',
                 null=True,
                 blank=True,
                 on_delete=models.CASCADE,
                 related_name='children'
    )

    def __str__(self):
        return self.name

#記事のカテゴリーモデル
class Category(models.Model):
    name = models.CharField('カテゴリ名', max_length=30)
    def __str__(self):
        return self.name


#記事本体
class Article(models.Model):

    # 記事データ
    title = models.CharField(verbose_name='タイトル',max_length=100)
    pub_date = models.DateTimeField(verbose_name='公開時間',default=datetime.now)
    pub_type = models.IntegerField(verbose_name='記事種別',choices=PUB_TYPES)
    thumbnail = FilerImageField(
            null=True,
            blank=True,
            related_name='thumbnail_article',
            on_delete='CASCADE'
    )
    edit_body = RichTextField()
    tags = models.ManyToManyField(Tag, verbose_name='タグ', blank=True)
    body = models.TextField()
    index = models.TextField(blank=True)
    category = models.ForeignKey(Category, verbose_name='カテゴリ',blank=True,on_delete='DO_NOTHING')
    meta = models.CharField(verbose_name='メタ情報',max_length=150,blank=True)
    sns_intro = models.CharField(verbose_name='SNS文章',max_length=140,blank=True)
    pv = models.PositiveIntegerField(verbose_name='PV数',default=0)

    # CeleryTask管理用
    celery_id = models.CharField(max_length=36,blank=True,null=True)
    tracker = FieldTracker(fields=['pub_date'])
    is_need_celery_change = models.BooleanField(blank=True,null=True)

    # PublishedManager追加
    objects = PublishedManager()

    # 表示を降べきに
    class Meta:
        ordering = ['-pub_date']

    def __str__(self):
        return self.title

    def category_name(self):
        return self.category.name

    def thumbnail_url(self):
        if self.thumbnail == None:
            return '/static/img/noImage.png'
        return self.thumbnail.url

    def save(self):
        self.is_need_celery_change = self.tracker.has_changed('pub_date')
        self.meta = MetaContentPublisher(self.edit_body)
        super(Article, self).save()

    def related_posts(self):
        query = Q()
        for t in self.tags.all():
            query.add(Q(tags=t),Q.OR)
        query.add(Q(pub_date__lte=self.pub_date),Q.AND)
        query.add(Q(pub_type=1),Q.AND)
        article_list = []
        related_posts_list = Article.objects.all().filter(query).order_by('pub_date').reverse().distinct().exclude(pk=self.pk)[:6]
        print(related_posts_list,query)
        for i in related_posts_list:
            article_list.append({
                            'pk': i.pk,
                            'title':i.title,
                            'pub_date':i.pub_date,
                            'thumbnail_url':i.thumbnail_url()
            })
        return article_list

    def delete(self):
        #もしタスクがあれば破棄
        if self.celery_id != None:
            revoke(self.celery_id,terminate=True)
        #実際のdelete呼び出し
        super(Article, self).delete()


#コメント
class Comment(models.Model):

    name = models.CharField(max_length=255, blank=True)
    text = models.TextField()
    target = models.ForeignKey(Article, on_delete=models.CASCADE,blank=True,null=True)
    reply_to = models.ForeignKey('self', on_delete=models.CASCADE,blank=None,null=True)
    is_public = models.BooleanField(default=True)


    def __str__(self):
        return self.name
