from rest_framework import generics, status, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from .models import Account, BudgetAllocation, History, Balance, Income
from .serializers import (AccountSerializer, BudgetAllocationSerializer, CreateAccountSerializer,
                          CreateHistorySerializer, CreateBalanceSerializer, CreateIncomeSerializer,
                          BalanceSerializer, IncomeSerializer, UpdateBalanceSerializer,
                          UserSerializer, HistorySerializer)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class AccountView(generics.ListAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer


class CreateAccountView(APIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            nik = serializer.data.get('nik')
            dob = serializer.data.get('dob')
            needs_split = serializer.data.get('needs_split')
            wants_split = serializer.data.get('wants_split')
            savings_split = serializer.data.get('savings_split')
            user_id = Token.objects.get(key=request.auth.key).user_id
            user = User.objects.get(id=user_id)
            account = Account(nik=nik, dob=dob,
                              needs_split=needs_split, wants_split=wants_split, savings_split=savings_split, user_id=user)
            account.save()
            return Response(AccountSerializer(account).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': "Invalid data..."}, status=status.HTTP_400_BAD_REQUEST)


class BalanceView(generics.ListAPIView):
    queryset = Balance.objects.all()
    serializer_class = BalanceSerializer


class CreateBalanceView(APIView):
    serializer_class = CreateBalanceSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            balance = serializer.data.get('balance')
            user_id = serializer.data.get('user_id')
            user = User.objects.get(id=user_id)
            account = Account.objects.get(user_id=user)
            if not Balance.objects.filter(user_id=user).exists():
                user_balance = Balance(balance=balance, user_id=user)
                user_balance.save()

                needs = balance * (account.needs_split / 100)
                wants = balance * (account.wants_split / 100)
                savings = balance * (account.savings_split / 100)
                ba_user_id = user

                if not BudgetAllocation.objects.filter(user_id=user).exists():
                    budget_allocation = BudgetAllocation(
                        needs=needs, wants=wants, savings=savings, user_id=ba_user_id)
                    budget_allocation.save()

                else:
                    budget_allocation = BudgetAllocation.objects.filter(user_id=user)[
                        0]
                    budget_allocation.needs = needs
                    budget_allocation.wants = wants
                    budget_allocation.savings = savings
                    budget_allocation.save(
                        update_fields=['needs', 'wants', 'savings'])
                return Response([BalanceSerializer(user_balance).data, BudgetAllocationSerializer(budget_allocation).data], status=status.HTTP_201_CREATED)
            else:
                # Update the balance
                user_balance = Balance.objects.filter(user_id=user)[0]
                user_budget_allocation = BudgetAllocation.objects.filter(user_id=user)[
                    0]
                if balance > user_balance.balance:
                    increase = balance - user_balance.balance
                    user_budget_allocation.needs += increase * user.needs_split / 100
                    user_budget_allocation.wants += increase * user.wants_split / 100
                    user_budget_allocation.savings += increase * user.savings_split / 100
                    user_budget_allocation.save(
                        update_fields=['needs', 'wants', 'savings'])
                elif balance < user_balance.balance:
                    decrease = user_balance.balance - balance
                    user_budget_allocation.needs -= (
                        decrease * user.needs_split / 100)
                    user_budget_allocation.wants -= (
                        decrease * user.wants_split / 100)
                    user_budget_allocation.savings -= (
                        decrease * user.savings_split / 100)
                    user_budget_allocation.save(
                        update_fields=['needs', 'wants', 'savings'])
                user_balance.balance = balance
                user_balance.user_id = user
                user_balance.save(update_fields=['balance', 'user_id'])
                return Response([BalanceSerializer(user_balance).data, BudgetAllocationSerializer(user_budget_allocation).data], status=status.HTTP_201_CREATED)


class UpdateBalance(APIView):
    serializer_class = UpdateBalanceSerializer

    def patch(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            balance = serializer.data.get('balance')
            user_id = serializer.data.get('user_id')
            user = User.objects.get(id=user_id)
            account = Account.objects.get(user_id=user)

            if not Balance.objects.filter(user_id=user).exists():
                return Response({'msg': "User not found."}, status=status.HTTP_404_NOT_FOUND)

            user_session = self.request.session.session_key

            if Balance.objects.filter(user_id=user) == False:
                return Response({'msg': "Invalid user."}, status=status.HTTP_403_FORBIDDEN)

            user_balance = Balance.objects.get(user_id=user)
            user_budget_allocation = BudgetAllocation.objects.filter(user_id=user)[
                0]
            if balance > user_balance.balance:
                increase = balance - user_balance.balance
                user_budget_allocation.needs += (increase *
                                                 account.needs_split / 100)
                user_budget_allocation.wants += (increase *
                                                 account.wants_split / 100)
                user_budget_allocation.savings += (
                    increase * account.savings_split / 100)
                user_budget_allocation.save(
                    update_fields=['needs', 'wants', 'savings'])
            elif balance < user_balance.balance:
                decrease = user_balance.balance - balance
                user_budget_allocation.needs -= (decrease *
                                                 account.needs_split / 100)
                user_budget_allocation.wants -= (decrease *
                                                 account.wants_split / 100)
                user_budget_allocation.savings -= (
                    decrease * account.savings_split / 100)
                user_budget_allocation.save(
                    update_fields=['needs', 'wants', 'savings'])
            user_balance.balance = balance
            user_balance.save(update_fields=['balance'])
            return Response([BalanceSerializer(user_balance).data, BudgetAllocationSerializer(user_budget_allocation).data], status=status.HTTP_200_OK)

        return Response({'Bad Request': "Invalid Data..."}, status=status.HTTP_400_BAD_REQUEST)


class IncomeView(generics.ListAPIView):
    queryset = Income.objects.all()
    serializer_class = IncomeSerializer


class CreateIncomeView(APIView):
    serializer_class = CreateIncomeSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            income = serializer.data.get('income')
            date_added = serializer.data.get('date_added')
            user_id = serializer.data.get('user_id')
            user = User.objects.get(id=user_id)
            account = Account.objects.get(user_id=user)
            user_income = Income(
                income=income, date_added=date_added, user_id=user)
            user_income.save()

            user_balance = Balance.objects.filter(user_id=user)[0]
            user_balance.balance = user_balance.balance + income
            user_balance.save(update_fields=['balance'])

            user_budget_allocation = BudgetAllocation.objects.get(user_id=user)
            user_budget_allocation.needs += income * \
                (account.needs_split / 100)
            user_budget_allocation.wants += income * \
                (account.wants_split / 100)
            user_budget_allocation.savings += income * \
                (account.savings_split / 100)
            user_budget_allocation.save(
                update_fields=['needs', 'wants', 'savings'])

            return Response([IncomeSerializer(user_income).data, BalanceSerializer(user_balance).data,
                             BudgetAllocationSerializer(user_budget_allocation).data], status=status.HTTP_201_CREATED)

        return Response({'Bad Request': "Invalid Data..."}, status=status.HTTP_400_BAD_REQUEST)


class BudgetAllocationView(generics.ListAPIView):
    queryset = BudgetAllocation.objects.all()
    serializer_class = BudgetAllocationSerializer


class HistoryView(generics.ListAPIView):
    queryset = History.objects.all()
    serializer_class = HistorySerializer


class CreateHistoryview(APIView):
    serializer_class = CreateHistorySerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            category = serializer.data.get('category')
            subcategory = serializer.data.get('subcategory')
            price = serializer.data.get('price')
            date_bought = serializer.data.get('date_bought')
            user_id = serializer.data.get('user_id')
            user = User.objects.get(id=user_id)
            history = History(category=category, subcategory=subcategory, price=price,
                              date_bought=date_bought, user_id=user)
            history.save()

            user_balance = Balance.objects.get(user_id=user)
            user_budget_allocation = BudgetAllocation.objects.get(user_id=user)
            if user_balance.balance >= price:
                if category == 'Needs':
                    if user_budget_allocation.needs + user_budget_allocation.savings >= price:
                        if user_budget_allocation.needs >= price:
                            user_budget_allocation.needs -= price
                            user_budget_allocation.save(
                                update_fields=['needs'])
                        elif user_budget_allocation.needs < price:
                            remaining_price = price - user_budget_allocation.needs
                            user_budget_allocation.needs = 0
                            user_budget_allocation.savings -= remaining_price
                            user_budget_allocation.save(
                                update_fields=['needs', 'savings'])
                    elif user_budget_allocation.needs + user_budget_allocation.savings < price:
                        return Response({'msg': "Needs and savings budget not sufficient..."}, status=status.HTTP_406_NOT_ACCEPTABLE)
                elif category == 'Wants':
                    if user_budget_allocation.wants + user_budget_allocation.savings >= price:
                        if user_budget_allocation.wants >= price:
                            user_budget_allocation.wants -= price
                            user_budget_allocation.save(
                                update_fields=['wants'])
                        elif user_budget_allocation.wants < price:
                            remaining_price = price - user_budget_allocation.wants
                            user_budget_allocation.wants = 0
                            user_budget_allocation.savings -= remaining_price
                            user_budget_allocation.save(
                                update_fields=['wants', 'savings'])
                    elif user_budget_allocation.wants + user_budget_allocation.savings < price:
                        return Response({'msg': "Wants and savings budget not sufficient..."})
                user_balance.balance -= price
                user_balance.save(update_fields=['balance'])
                return Response([HistorySerializer(history).data,
                                BalanceSerializer(user_balance).data,
                                BudgetAllocationSerializer(user_budget_allocation).data], status=status.HTTP_201_CREATED)
            elif user_balance.balance < price:
                return Response({'msg': "Balance not sufficient..."}, status=status.HTTP_406_NOT_ACCEPTABLE)
        else:
            return Response({'Bad Request': "Invalid Data..."}, status=status.HTTP_400_BAD_REQUEST)