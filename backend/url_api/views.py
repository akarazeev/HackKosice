from django.shortcuts import render

# Create your views here.

from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from python_api import api
# Create your views here.

class SpecialisationView(APIView):
    symptom_API = api.SymptomAPI()
    def post(self, request):
        symptoms = request.data.get('symptoms')
        gender = request.data.get('gender')
        year_of_birth = request.data.get('year_of_birth')
        specialisation = self.symptom_API.get_diagnosis(symptoms, gender, year_of_birth)
        return Response(specialisation)

class SymptomView(APIView):
    symptom_API = api.SymptomAPI()
    def get(self, request):
        symptoms = self.symptom_API.get_symptoms()
        return Response(symptoms)

class DiagnosisView(APIView):
    symptom_API = api.SymptomAPI()
    def post(self, request):
        symptoms = request.data.get('symptoms')
        # print(symptoms)
        gender = request.data.get('gender')
        year_of_birth = request.data.get('year_of_birth')
        # print(request.data)
        diagnosis = self.symptom_API.get_diagnosis(symptoms, gender, year_of_birth)
        # print(diagnosis)
        return Response(diagnosis)
