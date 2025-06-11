from rest_framework.routers import DefaultRouter
from django.urls import path , include
from children.views import ChildViewSet

router = DefaultRouter()
router.register('children', ChildViewSet)
urlpatterns = [
    path('', include(router.urls)),
]