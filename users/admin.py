from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'first_name', 'last_name', 'role', 'is_active', 'date_joined')
    list_filter = ('role', 'is_active', 'is_staff')
    search_fields = ('username', 'first_name', 'last_name')
    
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Qo\'shimcha ma\'lumotlar', {'fields': ('role',)}),
    )
    
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ('Qo\'shimcha ma\'lumotlar', {'fields': ('role',)}),
    )
