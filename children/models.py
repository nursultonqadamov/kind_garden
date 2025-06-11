from django.db import models
from datetime import date
# Create your models here.



class Child(models.Model):
    full_name = models.CharField(max_length=100)
    birth_date = models.DateField()

    def __str__(self):
        return self.full_name

    def age(self):
        today = date.today()
        return round((today - self.birth_date).days / 365.25, 2)
