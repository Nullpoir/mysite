# Generated by Django 2.2.10 on 2020-05-03 10:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('article', '0020_article_related_posts'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='article',
            name='related_posts',
        ),
    ]