from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
import json
import random
import string


from .serializers import CustomerSerializer, AccountSerializer, TransactionSerializer
from .models import Customer, Account, Transaction


from django.http import Http404, HttpResponseBadRequest
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


# Create your views here.

# class HeroViewSet(viewsets.ModelViewSet):
#     queryset = Hero.objects.all().order_by('name')
#     serializer_class = HeroSerializer

# def get(request):
#     customers = Customer.objects.all().order_by('lastName')
#     serializer = CustomerSerializer(customers)
#     return Response(serializer.data)

# def post(self, request, pk, format=None):
#     # new_customer = Customer(firstName=request.body.firstName,
#     #                     lastName=request.body.lastName, email=request.body.email)
#     print(json.loads(request.body)['firstName'])
#     return HttpResponse('ok')
#  return HttpResponse(new_customer)

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all().order_by('firstName')
    serializer_class = CustomerSerializer


class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all().order_by('id')
    serializer_class = AccountSerializer


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all().order_by('id')
    serializer_class = TransactionSerializer


class CustomerList(APIView):
    """
    List all customers, or create a new custromer.
    """

    def get(self, request, format=None):
        customers = Customer.objects.all().order_by('lastName')
        serializer = CustomerSerializer(customers, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            saved_customer = serializer.save()
            customer = Customer.objects.get(id=saved_customer.id)
            account = AccountList()
            account.post(request, customer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AccountList(APIView):
    def get_object(self, id):
        try:
            return Customer.objects.get(id=id)
        except Customer.DoesNotExist:
            raise Http404

    def generate_account_number(self):
        generated_acct = ''.join(random.choices(string.digits, k=8))
        try:
            account = Account.objects.get(accountNo=generated_acct)
            # if (account is not None):
            #     raise Exception('Account number already exists')
            # return generated_acct
        except Exception:
            return generated_acct
            # self.generate_account_number()

    def get(self, request):
        accounts = Account.objects.all()
        serializer_context = {
            'request': request,
        }
        # serializer = api_serializers.UserSerializer(user, context=serializer_context)
        serializer = AccountSerializer(
            accounts, context=serializer_context, many=True)
        return Response(serializer.data)

    def post(self, request, customer):
        # serializer = AccountSerializer(accountNumber='2424353')
        account_no = self.generate_account_number()
        customer_name = request.data['firstName'] + \
            ' ' + request.data['lastName']
        account_type = 'savings'
        total_balance = 0
        sort_code = ''
        customer_id = customer.id
        new_account = Account(customerName=customer_name, accountNo=account_no,
                              sortCode=sort_code, accountType=account_type, totalBalance=total_balance, customerId=customer_id)
        new_account.save()
        return Response(new_account.accountNo)


class AccountDetail(APIView):
    def get_customer(self, id):
        try:
            print(Customer.objects.get(id=id))
            return Customer.objects.get(id=id)
        except Customer.DoesNotExist:
            raise Http404

    def get_object(self, id):
        try:
            customer = self.get_customer(id)
            print(customer)
            return Account.objects.get(customerId=customer.id)
        except Account.DoesNotExist:
            raise Http404

    def get(self, request, id):
        account = Account.objects.get(customerId=id)
        print(account)
        serializer = AccountSerializer(account)
        print(serializer)
        return Response(serializer.data)


class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        bank_customer = None

        try:
            customer = Customer.objects.get(email=email)
            bank_customer = customer
            if (customer.password != password):
                raise Http404
        except Exception:
            raise Http404

        print(bank_customer)

        return HttpResponse(json.dumps({'id': bank_customer.id}))
