from django.db import models
from django.conf import settings
# Create your models here.

class Doctor(models.Model):
    name = models.CharField(max_length = 255)
    works_from = models.IntegerField()
    works_to = models.IntegerField()
    specialisation = models.CharField(max_length = 255)

class Patient(models.Model):
    name = models.CharField(max_length = 255)
    gender = models.CharField(max_length = 31)
    year_of_birth = models.IntegerField()
