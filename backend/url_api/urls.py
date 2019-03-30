from django.urls import path
from .views import DiagnosisView
app_name = "url_api"

urlpatterns = [
    path('diagnosis', DiagnosisView.as_view())
]
