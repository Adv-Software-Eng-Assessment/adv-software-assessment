from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
import json
import random
import string

from .exceptions import CustomException


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
    List all customers, or create a new customer.
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
        sort_code = '00000'
        customer_id = customer.id
        new_account = Account(customerName=customer_name, accountNo=account_no,
                              sortCode=sort_code, accountType=account_type, totalBalance=total_balance, customerId=customer_id)
        new_account.save()
        return Response(new_account.accountNo)


class AccountDetail(APIView):
    def get_customer(self, id):
        try:
            return Customer.objects.get(id=id)
        except Customer.DoesNotExist:
            raise Http404

    def get_object(self, id):
        try:
            customer = self.get_customer(id)
            return Account.objects.get(customerId=customer.id)
        except Account.DoesNotExist:
            raise Http404

    def get(self, request, id):
        account = Account.objects.get(customerId=id)
        serializer = AccountSerializer(account)
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

        return HttpResponse(json.dumps({'id': bank_customer.id}))


class DepositView(APIView):
    def get_object(self, id):
        try:
            return Account.objects.get(customerId=id)
        except Account.DoesNotExist:
            raise Http404

    def put(self, request, id):
        account = self.get_object(id)

        request_body = json.loads(request.body)

        balance = account.totalBalance + request_body['amount']

        serializer = AccountSerializer(account, data={
            'totalBalance': balance,
            'customerName': account.customerName,
            'customerId': account.customerId,
            'accountType': account.accountType,
            'accountNo': account.accountNo,
            'sortCode': '00000'
        })
        if serializer.is_valid():
            serializer.save()
            transaction = TransactionsView()
            transaction.post(request, account.customerId,
                             'Deposit', balance)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class WithdrawView(APIView):
    def get_object(self, id):
        try:
            return Account.objects.get(customerId=id)
        except Account.DoesNotExist:
            raise Http404

    def put(self, request, id):
        account = self.get_object(id)

        request_body = json.loads(request.body)

        if (request_body['amount'] > account.totalBalance):
            raise CustomException(
                detail={"Failure": "Insufficient balance"}, status_code=status.HTTP_400_BAD_REQUEST)
            # return Response('error', status=status.HTTP_400_BAD_REQUEST)

        balance = account.totalBalance - request_body['amount']

        serializer = AccountSerializer(account, data={
            'totalBalance': balance,
            'customerName': account.customerName,
            'customerId': account.customerId,
            'accountType': account.accountType,
            'accountNo': account.accountNo,
            'sortCode': '00000'
        })
        if serializer.is_valid():
            serializer.save()
            transaction = TransactionsView()
            transaction.post(request, account.customerId,
                             'Withdrawal', balance)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TransferView(APIView):
    def get_object(self, id):
        try:
            return Account.objects.get(customerId=id)
        except Account.DoesNotExist:
            raise Http404

    def put(self, request, id):
        account = self.get_object(id)

        request_body = json.loads(request.body)

        if (request_body['amount'] > account.totalBalance):
            raise CustomException(
                detail={"Failure": "Insufficient balance"}, status_code=status.HTTP_400_BAD_REQUEST)
            # return Response('error', status=status.HTTP_400_BAD_REQUEST)

        balance = account.totalBalance - request_body['amount']

        serializer = AccountSerializer(account, data={
            'totalBalance': balance,
            'customerName': account.customerName,
            'customerId': account.customerId,
            'accountType': account.accountType,
            'accountNo': account.accountNo,
            'sortCode': '00000'
        })
        if serializer.is_valid():
            serializer.save()
            transaction = TransactionsView()
            transaction.post(request, account.customerId,
                             'Transfer', balance)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TransactionsView(APIView):
    def get(self, request, id, format=None):
        try:
            transactions = Transaction.objects.filter(customerId=id)
            serializer = TransactionSerializer(transactions, many=True)
            return Response(serializer.data)
        except Transaction.DoesNotExist:
            raise Http404

    def post(self, request, customer_id, transaction_type, balance):
        receiver_customer_name = None
        receiver_account_no = request.data.get('receiverAccountNo') if request.data.get(
            'receiverAccountNo') is not None else None
        receiver_sort_code = request.data.get('receiverSortCode') if request.data.get(
            'receiverSortCode') is not None else None
        amount = request.data['amount']

        new_transaction = Transaction(receiverCustomerName=receiver_customer_name, receiverAccountNo=receiver_account_no, receiverSortCode=receiver_sort_code,
                                      amount=amount, transactionType=transaction_type, totalBalance=balance, customerId=customer_id)

        new_transaction.save()
        return Response(new_transaction)
