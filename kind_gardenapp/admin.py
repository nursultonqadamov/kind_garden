from django.contrib import admin
from .models import DailyUsageReport

# Register your models here.


@admin.register(DailyUsageReport)
class DailyUsageReportAdmin(admin.ModelAdmin):
    list_display = ('date', 'product', 'amount_used', 'expected_amount', 'is_overused', 'warning_message')
    list_filter = ('date', 'is_overused')
