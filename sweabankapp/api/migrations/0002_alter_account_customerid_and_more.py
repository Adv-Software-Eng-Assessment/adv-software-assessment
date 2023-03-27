# Generated by Django 4.1.7 on 2023-03-26 23:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='customerId',
            field=models.BigIntegerField(default=None, null=True),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='receiverCustomerName',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]