from rest_framework import routers
from django.urls import path
from .views import DoctorViewSet, PatientViewSet, ApplyView, PatientView
from .utils import *
from .models import Doctor

router = routers.DefaultRouter(trailing_slash=True)
router.register(r'doctors', DoctorViewSet, base_name='doctors')
router.register(r'patients', PatientViewSet, base_name='patients')

# router.register(r'applies', ApplyView, base_name='applies')
urlpatterns = router.urls
urlpatterns += path('applies', ApplyView.as_view()),
urlpatterns += path('patients_history', PatientView.as_view()),

# n, names, whs, specs = generate()
# for i in range(n):
#     print(names[i])
#     print(whs[i][0])
#     print(whs[i][1])
#     ids = [arr['ID'] for arr in specs[i]]
#     string = ''
#     for id in ids:
#         string += str(id)
#         string += ' '
#     print(string)
#
#     doc = Doctor(name = names[i], works_from = whs[i][0], \
#                  works_to = whs[i][1], specialisation = string)
#     doc.save()
#     # ids_string = ' '.join(map(str,ids))
#     # print(ids_string)
