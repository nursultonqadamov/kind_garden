from django.db import models
from meals.models import MealRequestItem
from products.models import Product
from django.utils import timezone
# Create your models here.


class DailyUsageReport(models.Model):
    date = models.DateField(default=timezone.now)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    amount_used = models.FloatField(help_text="Bugun ishlatilgan mahsulot (kg yoki gramm)")
    expected_amount = models.FloatField(help_text="Kutilgan me'yoriy miqdor")
    is_overused = models.BooleanField(default=False)
    warning_message = models.CharField(max_length=255, blank=True)

    def save(self, *args, **kwargs):
        if self.expected_amount > 0:
            overuse_percent = (self.amount_used - self.expected_amount) / self.expected_amount * 100
            if overuse_percent > 15:
                self.is_overused = True
                self.warning_message = f"❗️{self.product.name} — 15% dan ko‘proq ishlatilgan. Ehtimoliy o‘g‘irlik!"
        super().save(*args, **kwargs)