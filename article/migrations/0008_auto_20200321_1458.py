# Generated by Django 2.1.5 on 2020-03-21 05:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('article', '0007_auto_20200321_1456'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tag',
            name='parent_pk',
            field=models.PositiveIntegerField(blank=True, default=None, null=True),
        ),
    ]
