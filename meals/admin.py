from django.contrib import admin
from .models import PortionStandard, MealRequest, MealRequestItem

# Register your models here.


admin.site.register(PortionStandard)
admin.site.register(MealRequest)
admin.site.register(MealRequestItem)
