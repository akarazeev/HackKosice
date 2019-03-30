from django.shortcuts import render
from .serializers import DoctorSerializer, PatientSerializer
from rest_framework.response import Response
from rest_framework import viewsets, status
from .models import Doctor, Patient
from .utils import *
import os
# Create your views here.

class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    http_method_names = ['post']
    def create(self, request, *args, **kwargs):
        # print(os.getcwd())
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

class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    http_method_names = ['post', 'get']

    def get_queryset(self):
        if self.request.method == "GET":
            queryset = Patient.objects.all().filter(id=self.request.query_params.get('id'))
            return queryset
        return Patient.objects.all()

    def create(self, request, *args, **kwargs):
        data = self.request.data
        patient = Patient(name = data['name'], gender = data['gender'],
                          year_of_birth = data['year_of_birth'])
        patient.save()
        return Response({"id" : patient.id, "name" : patient.name, "gender" :
                         patient.gender, "year_of_birth" : patient.year_of_birth})
