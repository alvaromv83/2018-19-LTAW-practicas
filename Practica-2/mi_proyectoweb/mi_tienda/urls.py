# -*- coding: utf-8 -*-
from django.conf.urls import url
from . import views     # Con esto le decimos: coge todas las vistas creadas en
                        # mi_tienda e impórtalas.
urlpatterns = [
    url(r'^$', views.home_view),
    url(r'^list/', views.list),
    url(r'^pianos/', views.pianos_view),
    url(r'^guitarras/', views.guitarras_view),
    url(r'^bajos/', views.bajos_view),
    url(r'^search/', views.search),
    url(r'^form/', views.form),
]
