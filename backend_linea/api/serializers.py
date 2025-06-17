
from rest_framework import serializers
from .models import Tratto, Intervento

class TrattoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tratto
        fields = '__all__'

class InterventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Intervento
        fields = '__all__'
