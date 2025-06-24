from django.urls import path
from .views import ProductsListView, ProductCreateView

urlpatterns = [
    path('products/', ProductsListView.as_view(), name='products-list'),
    path('products/create/', ProductCreateView.as_view(), name='product-create'),
]
