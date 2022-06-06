from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import Account, Balance, BudgetAllocation, History, Income


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User(username=validated_data['username'])
        user.set_password(validated_data['password'])
        user.save()
        Token.objects.create(user=user)
        return user


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'nik', 'dob', 'needs_split',
                  'wants_split', 'savings_split', 'user_id')


class CreateAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('nik', 'dob', 'needs_split',
                  'wants_split', 'savings_split', 'user_id')


class BalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Balance
        fields = ('id', 'balance', 'user_id')


class CreateBalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Balance
        fields = ('balance', 'user_id')


class UpdateBalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Balance
        fields = ('balance', 'user_id')


class IncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = ('id', 'income', 'date_added', 'user_id')


class CreateIncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = ('income', 'date_added', 'user_id')


class BudgetAllocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = BudgetAllocation
        fields = ('id', 'needs', 'wants', 'savings', 'user_id')


class HistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = History
        fields = ('id', 'category', 'subcategory', 'price',
                  'date_bought', 'user_id')


class CreateHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = History
        fields = ('category', 'subcategory', 'price',
                  'date_bought', 'user_id')