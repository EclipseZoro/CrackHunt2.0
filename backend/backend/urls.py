from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
import os

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('games.urls')),
    path('api/leaderboard/', include('leaderboard.urls')),
    path('api/users/', include('users.urls')),

    # Serve React's index.html from backend/build/
    path("", TemplateView.as_view(template_name=os.path.join(settings.BASE_DIR, 'build', 'index.html')), name="home"),
]

# Serve static files correctly in development mode
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])

from django.views.static import serve
urlpatterns += [
    path('manifest.json', serve, {'document_root': os.path.join(settings.BASE_DIR, 'build'), 'path': 'manifest.json'}),
]