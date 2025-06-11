from .models import MealRequestItem, PortionStandard
from products.models import StockLot
from django.db import transaction


@transaction.atomic
def process_meal_request(meal_request):
    children = meal_request.children.all()
    avg_age = meal_request.average_age()

    for portion in PortionStandard.objects.all():
        if portion.min_age <= avg_age <= portion.max_age:
            total_portion = portion.portion_per_child * children.count()
            MealRequestItem.objects.create(
                meal_request=meal_request,
                product=portion.product,
                amount_needed=round(total_portion, 2)
            )

            
            try:
                stock_lot = StockLot.objects.filter(product=portion.product).latest('updated_at')
                if stock_lot.quantity >= total_portion:
                    stock_lot.quantity -= total_portion
                    stock_lot.save()
                else:
                    raise Exception(f"Not enough stock for product: {portion.product.name}")
            except StockLot.DoesNotExist:
                raise Exception(f"No stock lot found for product: {portion.product.name}")
