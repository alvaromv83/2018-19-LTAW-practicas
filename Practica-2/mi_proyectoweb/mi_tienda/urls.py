# -*- coding: utf-8 -*-
from django.conf.urls import url
from . import views     # Con esto le decimos: coge todas las vistas creadas en
                        # mi_tienda e impórtalas.
from mi_tienda.views import cuerda_view

urlpatterns = [
    url(r'^$', views.home_view),
    url(r'^cuerda/', views.cuerda_view),
    url(r'^percusion/', views.percusion_view),
    url(r'^viento/', views.viento_view),
    url(r'^list/', views.list),
]
