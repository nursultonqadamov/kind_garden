from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def api_root(request):
    return JsonResponse({
        'message': 'Bolalar bog\'chasi API',
        'version': '1.0',
        'endpoints': {
            'auth': '/api/auth/',
            'meals': '/api/meals/',
            'products': '/api/products/',
            'reports': '/api/reports/',
            'messages': '/api/messages/',
            'admin': '/admin/'
        }
    })

urlpatterns = [
    path('', api_root, name='api_root'),
    path('admin/', admin.site.urls),
    path('api/auth/', include('users.urls')),
    path('api/meals/', include('meals.urls')),
    path('api/products/', include('products.urls')),
    path('api/reports/', include('kind_gardenapp.urls')),
    path('api/messages/', include('kind_gardenapp.message_urls')),
]
