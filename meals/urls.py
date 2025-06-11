from django.urls import path
from .views import MealRequestCreateView

urlpatterns = [
    path('create/', MealRequestCreateView.as_view(), name='mealrequest-create'),
]
