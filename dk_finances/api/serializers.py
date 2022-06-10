from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import Account, Balance, BudgetAllocation, History, Income


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'first_name', 'last_name']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User(username=validated_data['username'], first_name=validated_data['first_name'], last_name=validated_data['last_name'])
        user.set_password(validated_data['password'])
        user.save()
        Token.objects.create(user=user)
        return user


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'nik', 'dob', 'needs_split',
                  'wants_split', 'savings_split', 'user_id')


class GetAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ()


class CreateAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('nik', 'dob', 'needs_split',
                  'wants_split', 'savings_split')


class BalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Balance
        fields = ('id', 'balance', 'user_id')


class GetBalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Balance
        fields = ()


class CreateBalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Balance
        fields = ('balance', )


class UpdateBalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Balance
        fields = ('balance', )


class IncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = ('id', 'income', 'date_added', 'user_id')


class GetIncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = ()


class CreateIncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = ('income', 'date_added')


class BudgetAllocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = BudgetAllocation
        fields = ('id', 'needs', 'wants', 'savings', 'user_id')


class GetBudgetAllocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = BudgetAllocation
        fields = ()


class HistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = History
        fields = ('id', 'category', 'subcategory', 'price',
                  'date_bought', 'user_id')


class GetHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = History
        fields = ()


class CreateHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = History
        fields = ('category', 'subcategory', 'price',
                  'date_bought')