from rest_framework import serializers
from .models import Doctor, Patient, PatientDoctorRelation
from django.conf import settings

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ('id', 'name', 'works_from', 'works_to', 'specialisation')

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ('id', 'name', 'gender', 'year_of_birth', 'phone')

class ApplySerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientDoctorRelation
        fields = ('date', 'time', 'symptoms', 'diagnosis')

# class ApplySerializer(serializers.Serializer):
