"""mi_tienda URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import include, url
from django.contrib import admin
from mi_tienda.views import mi_funcion  # Funcion definida en views.py
from mi_tienda.views import mi_producto  # Funcion definida en views.py
from mi_tienda.views import saludo  # Funcion definida en views.py


urlpatterns = [         # Se define una lista de urls
    url(r'^hola/', mi_funcion),  # Si empieza por hola/, llamamos a mi_funcion (en views.py)
    url(r'^producto/(\d{1,2})/$',mi_producto),  # Cualquier numero entero que tenga entre 1 y 2 digitos
    url(r'^test/', include(admin.site.urls)),  # Expresion regular:
    url(r'^saludo/', saludo),
    # La r inicial le dice a Python que lo siguiente es una expresion regular
    # ^ --> Permite introducir textos que estan al principio de la cadena
]
