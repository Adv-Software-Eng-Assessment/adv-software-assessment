from django.db import models


# Create your models here.
class Hero(models.Model):
    name = models.CharField(max_length=60)
    alias = models.CharField(max_length=60)

    def __str__(self):
        return self.name


class Customer(models.Model):
    firstName = models.CharField(max_length=60)
    lastName = models.CharField(max_length=60)
    email = models.CharField(max_length=40)
    mobileNo = models.CharField(max_length=20)
    zipCode = models.CharField(max_length=20)
    address = models.CharField(max_length=20)
    city = models.CharField(max_length=20)
    country = models.CharField(max_length=20)

    def __str__(self):
        return self.firstName


class Account(models.Model):
    accountNo
    sortCode
    accoutName
    routingNo
    accountType
    customerId = models.ForeignKey()