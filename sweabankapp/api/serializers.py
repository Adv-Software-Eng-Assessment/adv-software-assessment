from rest_framework import serializers
from .models import Customer, Account, Transaction


# class HeroSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = Hero
#         fields = ('name', 'alias')


class CustomerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Customer
        fields = ('firstName', 'lastName', 'mobileNo','email','city','country','address','zipCode' )

class AccountSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Account
        fields = ('customerName', 'accountNo', 'sortCode','accountType','totalBalance')

class TransactionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Transaction
        fields = ('receiverCustomerName', 'receiverAccountNo', 'receiverSortCode','transactionType','totalBalance')