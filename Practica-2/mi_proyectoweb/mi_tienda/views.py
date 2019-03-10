# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse

from mi_tienda.models import Product

# Create your views here.
def home_view (request):
    return render(request, "index.html", {})

def cuerda_view (request):
    return render(request, "cuerda.html", {})

def percusion_view (request):
    return render(request, "percusion.html", {})

def viento_view (request):
    return render(request, "viento.html", {})

def list(request):
    objects = Product.objects.all() # Creamos una lista que lee de la BD todos
                                    # los elementos
    html = "<p>Listado de articulos</p>"
    for elt in objects:
        print(elt.name)     # Debug (consola)
        html += '<p>'+ elt.name + ' ' + str(elt.price) + '<p>'  # Añadimos al
                                                                # HTML
    return HttpResponse(html)   # Enviamos la respuesta
