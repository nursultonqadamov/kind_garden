from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import MealRequest
from .services import process_meal_request


@receiver(post_save, sender=MealRequest)
def handle_meal_request_created(sender, instance, created, **kwargs):
    """
    MealRequest yaratilganda avtomatik ravishda process_meal_request chaqirish
    """
    if created:
        process_meal_request(instance)
