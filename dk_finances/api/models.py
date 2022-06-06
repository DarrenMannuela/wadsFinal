from django.db import models
from django.core.validators import RegexValidator
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import User


class Account(models.Model):
    nik = models.CharField(_("NIK"), max_length=16, blank=False, unique=True, validators=[
        RegexValidator(r'^\d{1,16}$')])
    dob = models.DateField(_("Date of birth"), blank=False)
    needs_split = models.IntegerField(_("needs percentage"))
    wants_split = models.IntegerField(_("wants percentage"))
    savings_split = models.IntegerField(_("savings percentage"))
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)


# The account's financial information
class Balance(models.Model):
    balance = models.IntegerField(_("balance"))
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)


class Income(models.Model):
    income = models.IntegerField(_("income"))
    date_added = models.DateField(_("date added"))
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)


# The allocation of an account's budget. Needs, wants and savings are going to be percentages
class BudgetAllocation(models.Model):
    needs = models.IntegerField(_("needs"))
    wants = models.IntegerField(_("wants"))
    savings = models.IntegerField(_("savings"))
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)


CATEGORY_CHOICES = (
    ('Needs', 'Needs'),
    ('Wants', 'Wants')
)


SUBCATEGORY_CHOICES = (
    ('Food', 'Food'),
    ('Transportation', 'Transportation'),
    ('Travel', 'Travel'),
    ('Housing', 'Housing'),
    ('Utility bills', 'Utility bills'),
    ('Cell phone', 'Cell phone'),
    ('Groceries', 'Groceries'),
    ('Clothing', 'Clothing'),
    ('Health care', 'Health care'),
    ('Child care', 'Child care'),
    ('Pet necessities', 'Pet necessities'),
    ('Pet insurance', 'Pet insurance'),
    ('Subscriptions', 'Subscriptions'),
    ('Others', 'Others')
)


# The purchase history of an account
class History(models.Model):
    category = models.CharField(
        _("category"), max_length=255, choices=CATEGORY_CHOICES)
    subcategory = models.CharField(
        _("subcategory"), max_length=255, choices=SUBCATEGORY_CHOICES)
    price = models.IntegerField(_("price"))
    date_bought = models.DateField(_("date bought"))
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)