from django.shortcuts import render

# Create your views here.

from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from python_api import api
# Create your views here.

class DiagnosisView(APIView):
    def post(self, request):
        data = request.data.get('ids')
        print(data)
        diagnosis = api.return_diagnosis(data)
        return Response({"Diagnosis": diagnosis})
