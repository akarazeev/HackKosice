from rest_framework import serializers
from .models import Doctor, Patient
from django.conf import settings

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ('id', 'name', 'works_from', 'works_to', 'specialisation')

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ('id', 'name', 'gender', 'year_of_birth')
