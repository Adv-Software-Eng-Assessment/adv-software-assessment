from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
import json
import random
import string

from .serializers import CustomerSerializer, AccountSerializer, TransactionSerializer
from .models import Customer, Account, Transaction


from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


# Create your views here.


# class HeroViewSet(viewsets.ModelViewSet):
#     queryset = Hero.objects.all().order_by('name')
#     serializer_class = HeroSerializer

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all().order_by('firstName')
    serializer_class = CustomerSerializer

    # def get(request):
    #     customers = Customer.objects.all().order_by('lastName')
    #     serializer = CustomerSerializer(customers)
    #     return Response(serializer.data)

    # def post(self, request, pk, format=None):
    #     # new_customer = Customer(firstName=request.body.firstName,
    #     #                     lastName=request.body.lastName, email=request.body.email)
    #     print(json.loads(request.body)['firstName'])
    #     return HttpResponse('ok')


class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all().order_by('id')
    serializer_class = AccountSerializer


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all().order_by('id')
    serializer_class = TransactionSerializer


def create_customer(request):
    new_customer = Customer(firstName=request.body.firstName,
                            lastName=request.body.lastName, email=request.body.email)
    print(request)
    return HttpResponse(new_customer)


class CustomerList(APIView):
    """
    List all snippets, or create a new snippet.
    """

    def get(self, request, format=None):
        snippets = Customer.objects.all().order_by('lastName')
        serializer = CustomerSerializer(snippets, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AccountDetail(APIView):
    def get_object(self, id):
        try:
            return Customer.objects.get(id=id)
        except Customer.DoesNotExist:
            raise Http404

    def generate_account_number(self, id):
        generated_acct = ''.join(random.choices(string.digits, k=8))
        try:
            account = Account.objects.get(id=id)
            if (account.accountNo == generated_acct):
                raise Exception('Account number already exists')
        except Exception:
            self.generate_account_number(id)

    def get(self, request, id):
        customer = self.get_object(id)
        serializer = CustomerSerializer(customer)
        return Response(serializer.data)

    def post(self, request):
        serializer = AccountSerializer(accountNumber='2424353')
