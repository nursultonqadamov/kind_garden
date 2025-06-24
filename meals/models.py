from django.db import models
from django.conf import settings
from django.db.models import CASCADE

from products.models import Product



class PortionStandard(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    min_age = models.FloatField()
    max_age = models.FloatField()
    portion_per_child = models.FloatField()

    def __str__(self):
        return f"{self.product.name} ({self.min_age}-{self.max_age}y): {self.portion_per_child}{self.product.unit}"


class MealType(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class MealStandard(models.Model):
    meal_type = models.ForeignKey(MealType, on_delete=CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    amount_per_child = models.FloatField()

    def __str__(self):
        return f"{self.meal_type.name} - {self.product.name}: {self.amount_per_child}{self.product.unit}"


class MealRequest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Kutilmoqda'),
        ('taken', 'Olindi'),
    ]
    
    chef = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    meal_type = models.ForeignKey(MealType, on_delete=models.CASCADE)
    children_count = models.IntegerField()
    use_extra = models.BooleanField(default=False)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"MealRequest #{self.id} - {self.meal_type.name} for {self.children_count} children"


class MealRequestItem(models.Model):
    meal_request = models.ForeignKey(MealRequest, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    needed_amount = models.FloatField()
    amount_with_extra = models.FloatField()

    def __str__(self):
        return f"{self.product.name} → {self.amount_with_extra}{self.product.unit}"

    @property
    def extra_percentage(self):
        if self.needed_amount > 0:
            return ((self.amount_with_extra - self.needed_amount) / self.needed_amount) * 100
        return 0
