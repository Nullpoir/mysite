from django.db import models
from datetime import datetime
from django.utils import timezone
from .article import Article
#コメント
class Comment(models.Model):

    name = models.CharField(max_length=255, blank=True)
    text = models.TextField()
    target = models.ForeignKey(Article, on_delete=models.CASCADE,blank=True,null=True)
    reply_to = models.ForeignKey('self', on_delete=models.CASCADE,blank=None,null=True)
    is_public = models.BooleanField(default=True)


    def __str__(self):
        return self.name
