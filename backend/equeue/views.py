from django.shortcuts import render
from .serializers import DoctorSerializer, PatientSerializer
from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.views import APIView
from .models import Doctor, Patient, PatientDoctorRelation
from .utils import *
import os
# Create your views here.

# class DoctorView(APIView):
#     def get(self, request):
#         queryset = Doctor.objects.all()
#         for obj in queryset:
#             if obj.specialisation.contains(self.request.query_params.get('specialisation')):
#
#
#         return Response({})

class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    http_method_names = ['post', 'get']
    def get_queryset(self):
        if self.request.method == "GET":
            if self.request.query_params.get('specialisation'):
                queryset = Doctor.objects.all()
                for obj in queryset:
                    if obj.specialisation.find(self.request.query_params.get('specialisation')) == -1:
                        print(queryset)
                        queryset = queryset.exclude(id = obj.id)
                return queryset
            return Doctor.objects.all()
        return Doctor.objects.all()
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


class ApplyView(APIView):
    def post(self, request):
        patient_id = request.data.get('patient_id')
        patient = Patient.objects.all().get(id = patient_id)
        doctor_id = request.data.get('doctor_id')
        doctor = Doctor.objects.all().get(id = doctor_id)
        symptoms = request.data.get('symptoms')
        diagnosis = request.data.get('diagnosis')
        apply = PatientDoctorRelation(patient = patient, doctor = doctor, symptoms = symptoms, \
                                      diagnosis = diagnosis)
        apply.save()
        return Response({"status":"added"})
    def get(self, request):
        patient_id = self.request.query_params.get('patient_id')
        applies = PatientDoctorRelation.objects.all()
        applicant = applies.get(patient__id = patient_id)
        if applies:
            # applies.exclude(id = applicant.id)
            for app in applies:
                if app.time > applicant.time or app.finished == True:
                    applies = applies.exclude(id = app.id)
            return Response({"queue":len(applies)})
