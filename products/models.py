from django.db import models

class Product(models.Model):
    UNIT_CHOICES = [
        ('kg', 'Kilogram'),
        # ('g', 'Gram'),
    ]

    name = models.CharField(max_length=100, unique=True)
    unit = models.CharField(max_length=2, choices=UNIT_CHOICES)

    def __str__(self):
        return f"{self.name} ({self.unit})"


class StockLot(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='stock_lots')
    quantity = models.FloatField()  # Mass in kg or g
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.product.name} - {self.quantity} {self.product.unit}"

    @property
    def status(self):
        if self.quantity <= 0:
            return "danger"
        elif self.quantity < 50:
            return "warning"
        return "ok"
