from django.urls import path
from .views import DiagnosisView, SymptomView, SpecialisationView
app_name = "url_api"

urlpatterns = [
    path('diagnosis', DiagnosisView.as_view()),
    path('symptoms', SymptomView.as_view()),
    path('specialisations', SpecialisationView.as_view())
]
