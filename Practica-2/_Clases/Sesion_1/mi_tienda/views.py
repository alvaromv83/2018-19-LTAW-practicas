from django.http import HttpResponse
from django.template import Template, Context

def mi_funcion(request): # El parametro que le paso es el request cliente
	html = "Hola! Mi primera UrL!!"
	return HttpResponse(html)  # Llamamos al modulo HttpResponse de Django

def mi_producto(request, param):
	numero = int(param)
	html = "Acceso a producto: %i" % numero;
	return HttpResponse(html)

PLANTILLA = """
<!DOCTYPE html>
<html lang="es" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Saludo</title>
  </head>
  <body>
    <p>Bienvenido a mi tienda, {{user}}</p>
  </body>
</html>
"""

def saludo(request):
    # --Procesar la plantilla
    t = Template(PLANTILLA)

    # -- Crear el contexto: Nombre de usuario real
    c = Context({'user':'Epic Saxo guy'})   # Asociacion entre los parametros introducidos
                                            # en la plantilla y los valores reales que queremos meterle

    # -- Obtener la pagina html final
    html = t.render(c)  # Toma la plantilla y renderizala con el contexto que te he pasado
    return HttpResponse(html)
