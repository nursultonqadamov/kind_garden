from django.db import models
from django.conf import settings
from products.models import Product
from children.models import Child
from datetime import date


class PortionStandard(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    min_age = models.FloatField()  # yosh (yil) bo‘yicha oraliq
    max_age = models.FloatField()
    portion_per_child = models.FloatField()  # kg yoki g

    def __str__(self):
        return f"{self.product.name} ({self.min_age}-{self.max_age}y): {self.portion_per_child}{self.product.unit}"


class MealRequest(models.Model):
    chef = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    children = models.ManyToManyField(Child)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"MealRequest #{self.id} by {self.chef}"

    def average_age(self):
        ages = [child.age() for child in self.children.all()]
        return round(sum(ages) / len(ages), 2) if ages else 0


class MealRequestItem(models.Model):
    meal_request = models.ForeignKey(MealRequest, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    amount_needed = models.FloatField()

    def __str__(self):
        return f"{self.product.name} → {self.amount_needed}{self.product.unit}"
