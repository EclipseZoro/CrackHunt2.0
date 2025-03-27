from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve
import os

urlpatterns = [
    # Django Admin Panel
    path('admin/', admin.site.urls),

    # API Routes
    path('api/games/', include('games.urls')),  # Ensure this app exists
    path('api/leaderboard/', include('leaderboard.urls')),  # Ensure this app exists
    path('api/users/', include('users.urls')),  # User authentication endpoints

    # Serve React's index.html from build/
    path('', TemplateView.as_view(template_name='index.html'), name="home"),
]

# Serve static files correctly in development mode
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# Serve static files and manifest.json for React PWA
urlpatterns += [
    path('manifest.json', serve, {'document_root': os.path.join(settings.BASE_DIR, 'build'), 'path': 'manifest.json'}),
]

