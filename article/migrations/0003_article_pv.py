# Generated by Django 2.1.5 on 2020-01-16 07:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('article', '0002_auto_20191230_1641'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='pv',
            field=models.PositiveIntegerField(default=0, verbose_name='PV数'),
            preserve_default=False,
        ),
    ]
