# -*- coding: utf-8 -*-
from django.conf.urls import url
from . import views     # Con esto le decimos: coge todas las vistas creadas en
                        # mi_tienda e impórtalas.

urlpatterns = [
    url(r'^$', views.home_view),
]
