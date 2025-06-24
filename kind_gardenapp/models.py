from django.db import models
from products.models import Product
from django.utils import timezone
from django.conf import settings


class DailyUsageReport(models.Model):
    date = models.DateField(default=timezone.now)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    amount_used = models.FloatField(help_text="Bugun ishlatilgan mahsulot (kg yoki gramm)")
    expected_amount = models.FloatField(help_text="Kutilgan me'yoriy miqdor")
    cook_name = models.CharField(max_length=100, default="Noma'lum")
    used_extra = models.BooleanField(default=False)
    is_overused = models.BooleanField(default=False)
    warning_message = models.CharField(max_length=255, blank=True)

    def save(self, *args, **kwargs):
        if self.expected_amount > 0:
            overuse_percent = (self.amount_used - self.expected_amount) / self.expected_amount * 100
            if overuse_percent > 15:
                self.is_overused = True
                self.warning_message = f"❗️{self.product.name} — {overuse_percent:.1f}% dan ko'proq ishlatilgan. Ehtimoliy o'g'irlik!"
            elif self.used_extra and overuse_percent <= 15:
                self.warning_message = f"✅ {self.product.name} — 15% qo'shimcha ishlatilgan (ruxsat berilgan)"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.date} - {self.product.name} - {self.cook_name}"


class Message(models.Model):
    MESSAGE_TYPES = [
        ('general', 'Umumiy xabar'),
        ('request', 'Talab'),
        ('suggestion', 'Taklif'),
        ('complaint', 'Shikoyat'),
        ('question', 'Savol'),
    ]
    
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='sent_messages')
    receiver = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='received_messages', null=True, blank=True)
    message_type = models.CharField(max_length=20, choices=MESSAGE_TYPES, default='general')
    subject = models.CharField(max_length=200)
    content = models.TextField()
    is_read = models.BooleanField(default=False)
    is_urgent = models.BooleanField(default=False, help_text="Shoshilinch xabar")
    created_at = models.DateTimeField(auto_now_add=True)
    parent_message = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='replies')

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.get_message_type_display()}: {self.sender.username} -> {self.receiver.username if self.receiver else 'Admin'}: {self.subject}"
