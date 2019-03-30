from rest_framework import serializers
from .models import Doctor
from django.conf import settings
class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ('name', 'works_from', 'works_to', 'specialisation')
