from django.urls import path
from .views import DiagnosisView, SymptomView
app_name = "url_api"

urlpatterns = [
    path('diagnosis', DiagnosisView.as_view()),
    path('symptoms', SymptomView.as_view())
]
