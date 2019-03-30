from django.db import models
from django.conf import settings
# Create your models here.

class Patient(models.Model):
    name = models.CharField(max_length = 255)
    gender = models.CharField(max_length = 31)
    year_of_birth = models.IntegerField()

class Doctor(models.Model):
    name = models.CharField(max_length = 255)
    works_from = models.IntegerField()
    works_to = models.IntegerField()
    specialisation = models.CharField(max_length = 255)
    patient = models.ManyToManyField(Patient, through='PatientDoctorRelation', related_name='patient')

class PatientDoctorRelation(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    time = models.TimeField(auto_now_add=True)
    finished = models.BooleanField(default=False)
    symptoms = models.CharField(max_length = 255)
    diagnosis = models.CharField(max_length = 255)
