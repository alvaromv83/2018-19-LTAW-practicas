# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Product (models.Model):   # Definimos los campos para la BD (con estos
                                # tres tipos básicos es suficiente, pero hay
                                # más en la documentación de Django):
    name = models.CharField(max_length=200)
    stock = models.IntegerField()
    price = models.FloatField()
