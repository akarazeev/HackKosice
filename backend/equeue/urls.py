from rest_framework import routers
from .views import DoctorViewSet, PatientViewSet

router = routers.DefaultRouter(trailing_slash=True)
router.register(r'doctors', DoctorViewSet, base_name='doctors')
router.register(r'patients', PatientViewSet, base_name='doctors')

urlpatterns = router.urls
