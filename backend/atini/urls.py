from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from project.views import LoginView, LogoutView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include("project.urls")),
    path("api/login/", LoginView.as_view()), #Login endpoint
    path("api/token/refresh/", TokenRefreshView.as_view()), #Refresh token endpoint
    path("api/logout/", LogoutView.as_view()), #Logout endpoint
    path("api-auth/", include("rest_framework.urls")),
]