from django.urls import path, include
from rest_framework import routers
from .views import (
    AccountView, BudgetAllocationView, CreateAccountView,
    CreateHistoryview, GetAccountView, GetBalanceView, GetHistoryView, GetIncomeView, UpdateBalance, UserViewSet,
    BalanceView, CreateBalanceView, IncomeView, CreateIncomeView, HistoryView, GetBudgetAllocationView
)

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('balances', BalanceView.as_view()),
    path('get-balance', GetBalanceView.as_view()),
    path('create-balance', CreateBalanceView.as_view()),
    path('update-balance', UpdateBalance.as_view()),
    path('incomes', IncomeView.as_view()),
    path('get-income', GetIncomeView.as_view()),
    path('create-income', CreateIncomeView.as_view()),
    path('budget-allocation', BudgetAllocationView.as_view()),
    path('get-budget-allocation', GetBudgetAllocationView.as_view()),
    path('history', HistoryView.as_view()),
    path('get-history', GetHistoryView.as_view()),
    path('create-history', CreateHistoryview.as_view()),
    path('account', AccountView.as_view()),
    path('get-account', GetAccountView.as_view()),
    path('create-account', CreateAccountView.as_view()),
]