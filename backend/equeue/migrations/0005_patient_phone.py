# Generated by Django 2.1.7 on 2019-03-30 22:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('equeue', '0004_patientdoctorrelation_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='patient',
            name='phone',
            field=models.CharField(max_length=15, null=True),
        ),
    ]
