from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Ticket

class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Custom Roles', {'fields': ('role',)}),
    )

admin.site.register(User, CustomUserAdmin)
admin.site.register(Ticket)