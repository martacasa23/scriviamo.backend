from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('stories.urls')),  # Include gli URL dell'app 'stories'
]
