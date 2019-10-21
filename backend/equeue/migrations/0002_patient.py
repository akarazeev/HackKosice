# Generated by Django 2.1.7 on 2019-03-30 16:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('equeue', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('gender', models.CharField(max_length=31)),
                ('year_of_birth', models.IntegerField()),
            ],
        ),
    ]