# Generated by Django 2.1.5 on 2020-04-01 02:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('article', '0017_remove_article_related_posts'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='related_posts',
            field=models.ManyToManyField(blank='True', related_name='_article_related_posts_+', to='article.Article', verbose_name='関連記事'),
        ),
    ]
