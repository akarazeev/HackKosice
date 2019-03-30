from django.shortcuts import render
from .serializers import DoctorSerializer
from rest_framework.response import Response
from rest_framework import viewsets, status
from .models import Doctor
from .utils import *
import os
# Create your views here.

class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    http_method_names = ['post']
    def create(self, request, *args, **kwargs):
        print(os.getcwd())
        name = random_name("equeue/data/topnames.txt", "equeue/data/topsurnames.txt")
        time = random_wh()
        specialisation = random_specs("equeue/data/specialisations.json")
        doctor = Doctor(name = name, works_from = time[0], works_to = time[1], \
                        specialisation = specialisation)
        doctor.save()
        return Response([], status=status.HTTP_201_CREATED)
        # serializer = self.get_serializer(data=request.data, many=isinstance(request.data, list))
        # serializer.is_valid(raise_exception=True)
        # self.perform_create(serializer)
        # headers = self.get_success_headers(serializer.data)
        # return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
