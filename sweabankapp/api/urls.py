# api/urls.py
# from django.urls import include, path
from rest_framework import routers
from . import views
from rest_framework.urlpatterns import format_suffix_patterns
from django.urls import path, include

router = routers.DefaultRouter()
# # router.register(r'heroes', views.HeroViewSet)
router.register(r'customers', views.CustomerViewSet)
router.register(r'account', views.AccountViewSet)
# router.register('account/<int:id>/', views.AccountDetailViewSet)
router.register(r'transaction', views.TransactionViewSet)

# # Wire up our API using automatic URL routing.
# # Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('login/', views.LoginView.as_view()),
    path('customers/', views.CustomerList.as_view()),
    path('account/create/', views.AccountList.as_view()),
    path('account/cust/<int:id>/', views.AccountDetail.as_view()),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    # path('customers/new/', views.CustomerViewSet.post),
]

# urlpatterns = [
#     path('customers/', views.CustomerList.as_view()),
#     # path('snippets/<int:pk>/', views.snippet_detail),
# ]

# urlpatterns = format_suffix_patterns(urlpatterns)
