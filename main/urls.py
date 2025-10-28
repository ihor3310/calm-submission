from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('auth/register/', views.register_user, name='register'),
    path('queues/', views.QueueListView.as_view(), name='queues'),
    path('queues/<int:pk>/', views.QueueDetailView.as_view(), name='queue_detail'),
    path('entries/', views.QueueEntryListView.as_view(), name='queue_entries'),
    path('entries/<int:pk>/', views.QueueEntryDetailView.as_view(), name='queue_entry_detail'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='verify'),
    path('register/', views.Register.as_view(), name='api_register'),
    path('profile/', views.user_profile, name='user_profile'),
    path('csrf/', views.get_csrf_token, name='csrf'),
]
