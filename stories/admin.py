from django.contrib import admin
from .models import Story

@admin.action(description="Pubblica le storie selezionate")
def publish_stories(modeladmin, request, queryset):
    queryset.update(is_published=True)  # Aggiorna il campo is_published
    modeladmin.message_user(request, f"{queryset.count()} storie pubblicate con successo.")

class StoryAdmin(admin.ModelAdmin):
    list_display = ('title', 'name', 'is_published')
    actions = [publish_stories]  # Registra l'azione

admin.site.register(Story, StoryAdmin)
