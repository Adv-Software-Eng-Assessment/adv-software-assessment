from django.shortcuts import render
from rest_framework import viewsets

from .serializers import HeroSerializer, CustomerSerializer
from .models import Hero, Customer


# Create your views here.


class HeroViewSet(viewsets.ModelViewSet):
    queryset = Hero.objects.all().order_by('name')
    serializer_class = HeroSerializer

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all().order_by('firstName')
    serializer_class = CustomerSerializer