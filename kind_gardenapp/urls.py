from django.urls import path
from .views import UsageReportsListView

urlpatterns = [
    path('usage-reports/', UsageReportsListView.as_view(), name='usage-reports'),
]
