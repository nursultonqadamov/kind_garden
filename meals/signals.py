from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import MealRequest
from .services import process_meal_request

@receiver(post_save, sender=MealRequest)
def handle_meal_request_created(sender, instance, created, **kwargs):
    if created:
        process_meal_request(instance)


from kind_gardenapp.services import generate_daily_report

@receiver(post_save, sender=MealRequest)
def handle_meal_request_created(sender, instance, created, **kwargs):
    if created:
        process_meal_request(instance)
        generate_daily_report(instance)
