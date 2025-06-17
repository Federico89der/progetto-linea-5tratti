
from rest_framework import viewsets
from .models import Tratto, Intervento
from .serializers import TrattoSerializer, InterventoSerializer

class TrattoViewSet(viewsets.ModelViewSet):
    queryset = Tratto.objects.all()
    serializer_class = TrattoSerializer

class InterventoViewSet(viewsets.ModelViewSet):
    queryset = Intervento.objects.all()
    serializer_class = InterventoSerializer
