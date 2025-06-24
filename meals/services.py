from .models import MealRequestItem, MealStandard
from products.models import StockLot
from django.db import transaction


@transaction.atomic
def process_meal_request(meal_request):
    """
    MealRequest yaratilganda avtomatik ravishda kerakli mahsulotlarni hisoblash
    """
    children_count = meal_request.children_count
    
    # MealStandard bo'yicha kerakli mahsulotlarni hisoblash
    meal_standards = MealStandard.objects.filter(meal_type=meal_request.meal_type)
    
    for standard in meal_standards:
        # Asosiy kerakli miqdor
        needed_amount = standard.amount_per_child * children_count
        
        # Qo'shimcha bilan (agar tanlangan bo'lsa)
        if meal_request.use_extra:
            amount_with_extra = needed_amount * 1.15  # 15% qo'shimcha
        else:
            amount_with_extra = needed_amount
        
        # MealRequestItem yaratish
        MealRequestItem.objects.create(
            meal_request=meal_request,
            product=standard.product,
            needed_amount=needed_amount,
            amount_with_extra=amount_with_extra
        )
