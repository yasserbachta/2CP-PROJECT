# Generated by Django 5.0.4 on 2024-06-01 06:36

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0006_alter_classes_niveau'),
    ]

    operations = [
        migrations.AddField(
            model_name='events',
            name='is_voting_event',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='events',
            name='no_voters',
            field=models.ManyToManyField(blank=True, related_name='no_voters', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='events',
            name='title',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AddField(
            model_name='events',
            name='yes_voters',
            field=models.ManyToManyField(blank=True, related_name='yes_voters', to=settings.AUTH_USER_MODEL),
        ),
    ]
