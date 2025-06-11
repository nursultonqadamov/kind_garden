from .models import DailyUsageReport
from django.utils import timezone

def generate_daily_report(meal_request):
    date = timezone.now().date()
    items = meal_request.items.all()  # MealRequestItem lar

    for item in items:
        product = item.product
        amount_used = item.amount_needed

        portion = product.portionstandard_set.first()
        expected = portion.portion_per_child * meal_request.children.count()

        DailyUsageReport.objects.create(
            date=date,
            product=product,
            amount_used=amount_used,
            expected_amount=expected
        )
