
from django.db import models

class Tratto(models.Model):
    nome = models.CharField(max_length=50)
    stato = models.CharField(max_length=20, choices=[
        ('ok', 'Completato'),
        ('in_scadenza', 'In scadenza'),
        ('da_fare', 'Da fare')
    ])

    def __str__(self):
        return self.nome

class Intervento(models.Model):
    tratto = models.ForeignKey(Tratto, on_delete=models.CASCADE, related_name='interventi')
    data = models.DateField(auto_now_add=True)
    tipo = models.CharField(max_length=50)
    note = models.TextField(blank=True)
    tecnico = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.tipo} - {self.tratto.nome}"
