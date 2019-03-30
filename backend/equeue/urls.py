from rest_framework import routers
from django.urls import path
from .views import DoctorViewSet, PatientViewSet, ApplyView

router = routers.DefaultRouter(trailing_slash=True)
router.register(r'doctors', DoctorViewSet, base_name='doctors')
router.register(r'patients', PatientViewSet, base_name='patients')
# router.register(r'applies', ApplyView, base_name='applies')
urlpatterns = router.urls
urlpatterns += path('applies', ApplyView.as_view()),
