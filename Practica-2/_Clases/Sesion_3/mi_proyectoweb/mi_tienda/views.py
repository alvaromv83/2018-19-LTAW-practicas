# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def home_view (request):
    return render(request, "index.html", {}) # A render le paso el HTML y un
                                             # diccionario vacío.
