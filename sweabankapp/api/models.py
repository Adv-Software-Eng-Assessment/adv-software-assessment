from django.db import models


# Create your models here.
# class Hero(models.Model):
#     name = models.CharField(max_length=60)
#     alias = models.CharField(max_length=60)

#     def __str__(self):
#         return self.name


class Customer(models.Model):
    firstName = models.CharField(max_length=60)
    lastName = models.CharField(max_length=60)
    # dob = models.CharField(max_length=40)
    email = models.CharField(max_length=40)
    password = models.TextField(default=None, null=True, blank=True)
    mobileNo = models.CharField(max_length=20, null=True)
    zipCode = models.CharField(max_length=20, null=True)
    address = models.CharField(max_length=20, null=True)
    city = models.CharField(max_length=20, null=True)
    country = models.CharField(max_length=20, null=True)

    def __str__(self):
        return '%s, %s, %s,%s,%s,%s,%s,%s' % (self.firstName, self.lastName, self.email, self.mobileNo, self.zipCode, self.address, self.city, self.country)


class Account(models.Model):
    customerName = models.CharField(max_length=20)
    accountNo = models.BigIntegerField()
    sortCode = models.CharField(max_length=20)
    accountType = models.CharField(max_length=20)
    customerId = models.BigIntegerField(default=None, null=True)
    totalBalance = models.FloatField(max_length=40)

    def __str__(self):
        return '%s, %s, %s,%s,%s,%s' % (self.customerName, self.accountNo, self.sortCode, self.accountType, self.customerId, self.totalBalance)


class Transaction(models.Model):
    receiverCustomerName = models.CharField(max_length=20)
    receiverAccountNo = models.BigIntegerField()
    receiverSortCode = models.CharField(max_length=20)
    transactionType = models.CharField(max_length=20)
    customerId = models.BigIntegerField(default=None, null=True)
    amount = models.FloatField(default=0)
    totalBalance = models.FloatField(max_length=40)
    # customerId = models.ForeignKey(Customer, models.SET_NULL,
    #                            blank=True,
    #                            null=True)

    def __str__(self):
        return '%s,%s,%s,%s,%s,%s,%s' % (self.receiverCustomerName, self.receiverAccountNo, self.receiverSortCode, self.customerId, self.totalBalance, self.transactionType, self.amount)
