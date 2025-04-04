from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Item
from .serializers import ItemSerializer

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()  # Fetch all items
    serializer_class = ItemSerializer  # Convert items to JSON

