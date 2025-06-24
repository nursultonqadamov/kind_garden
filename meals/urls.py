from django.urls import path
from .views import (
    MealTypesListView, 
    MealTypeCreateView,
    MealRequestCreateView, 
    TakeProductsView, 
    MealRequestsListView
)

urlpatterns = [
    path('meal-types/', MealTypesListView.as_view(), name='meal-types'),
    path('meal-types/create/', MealTypeCreateView.as_view(), name='meal-type-create'),
    path('meal-requests/', MealRequestsListView.as_view(), name='meal-requests'),
    path('meal-requests/create/', MealRequestCreateView.as_view(), name='meal-request-create'),
    path('take-products/', TakeProductsView.as_view(), name='take-products'),
]
