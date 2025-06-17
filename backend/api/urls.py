
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TrattoViewSet, InterventoViewSet

router = DefaultRouter()
router.register(r'tratti', TrattoViewSet)
router.register(r'interventi', InterventoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
