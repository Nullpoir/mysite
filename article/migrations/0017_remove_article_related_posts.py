# Generated by Django 2.1.5 on 2020-03-31 01:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('article', '0016_article_related_posts'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='article',
            name='related_posts',
        ),
    ]
