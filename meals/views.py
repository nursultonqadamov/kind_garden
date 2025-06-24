from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import MealType, MealStandard, MealRequest, MealRequestItem
from products.models import StockLot, Product
from kind_gardenapp.models import DailyUsageReport
from django.utils import timezone
from django.db import transaction


class MealTypesListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        meal_types = MealType.objects.all()
        data = []
        for meal_type in meal_types:
            standards = MealStandard.objects.filter(meal_type=meal_type)
            products = []
            for standard in standards:
                products.append({
                    'product': {
                        'id': standard.product.id,
                        'name': standard.product.name,
                        'unit': standard.product.unit
                    },
                    'amount_per_child': standard.amount_per_child
                })
            
            data.append({
                'id': meal_type.id,
                'name': meal_type.name,
                'products': products
            })
        
        return Response(data)


class MealTypeCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Faqat cook ovqat turi qo'sha oladi
        if request.user.role != 'cook':
            return Response(
                {"error": "Faqat oshpaz ovqat turi qo'sha oladi"}, 
                status=status.HTTP_403_FORBIDDEN
            )
        
        name = request.data.get('name')
        products_data = request.data.get('products', [])
        
        if not name:
            return Response(
                {"error": "Ovqat nomi majburiy"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not products_data:
            return Response(
                {"error": "Kamida bitta mahsulot qo'shish kerak"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        with transaction.atomic():
            # Ovqat turi yaratish
            meal_type = MealType.objects.create(name=name)
            
            # Mahsulotlar qo'shish
            for product_data in products_data:
                product_id = product_data.get('product_id')
                amount = product_data.get('amount_per_child')
                
                if not product_id or not amount:
                    continue
                
                try:
                    product = Product.objects.get(id=product_id)
                    amount = float(amount)
                    
                    MealStandard.objects.create(
                        meal_type=meal_type,
                        product=product,
                        amount_per_child=amount
                    )
                except (Product.DoesNotExist, ValueError):
                    continue
        
        return Response({
            "detail": "Ovqat turi muvaffaqiyatli yaratildi!",
            "meal_type_id": meal_type.id
        }, status=status.HTTP_201_CREATED)


class MealRequestCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        meal_type_id = request.data.get('meal_type_id')
        children_count = request.data.get('children_count')
        use_extra = request.data.get('use_extra', False)

        if not meal_type_id or not children_count:
            return Response(
                {"error": "meal_type_id va children_count majburiy"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            children_count = int(children_count)
            if children_count <= 0:
                raise ValueError("Bolalar soni musbat bo'lishi kerak")
        except ValueError:
            return Response(
                {"error": "Bolalar soni noto'g'ri"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        meal_type = get_object_or_404(MealType, id=meal_type_id)
        
        with transaction.atomic():
            meal_request = MealRequest.objects.create(
                chef=request.user,
                meal_type=meal_type,
                children_count=children_count,
                use_extra=use_extra
            )

            standards = MealStandard.objects.filter(meal_type=meal_type)
            for standard in standards:
                needed_amount = standard.amount_per_child * children_count
                amount_with_extra = needed_amount * 1.15 if use_extra else needed_amount

                MealRequestItem.objects.create(
                    meal_request=meal_request,
                    product=standard.product,
                    needed_amount=needed_amount,
                    amount_with_extra=amount_with_extra
                )

        return Response({
            "detail": "Buyurtma muvaffaqiyatli yaratildi!",
            "meal_request_id": meal_request.id
        }, status=status.HTTP_201_CREATED)


class TakeProductsView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        meal_request_id = request.data.get('meal_request_id')
        
        if not meal_request_id:
            return Response(
                {"error": "meal_request_id majburiy"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        meal_request = get_object_or_404(
            MealRequest, 
            id=meal_request_id, 
            chef=request.user,
            status='pending'
        )

        with transaction.atomic():
            for item in meal_request.items.all():
                try:
                    stock_lot = StockLot.objects.get(product=item.product)
                    
                    DailyUsageReport.objects.create(
                        product=item.product,
                        amount_used=item.amount_with_extra,
                        expected_amount=item.needed_amount,
                        cook_name=request.user.get_full_name() or request.user.username,
                        used_extra=meal_request.use_extra
                    )
                    
                    if stock_lot.quantity >= item.amount_with_extra:
                        stock_lot.quantity -= item.amount_with_extra
                    else:
                        return Response(
                            {"error": f"{item.product.name} mahsuloti yetarli emas. Mavjud: {stock_lot.quantity} {item.product.unit}"}, 
                            status=status.HTTP_400_BAD_REQUEST
                        )
                    
                    stock_lot.save()
                    
                except StockLot.DoesNotExist:
                    return Response(
                        {"error": f"{item.product.name} mahsuloti zaxirada yo'q"}, 
                        status=status.HTTP_400_BAD_REQUEST
                    )

            meal_request.status = 'taken'
            meal_request.save()

        return Response({
            "detail": "Mahsulotlar muvaffaqiyatli olindi!"
        }, status=status.HTTP_200_OK)


class MealRequestsListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        meal_requests = MealRequest.objects.filter(chef=request.user).order_by('-created_at')
        data = []
        
        for meal_request in meal_requests:
            items = []
            for item in meal_request.items.all():
                items.append({
                    'product': {
                        'id': item.product.id,
                        'name': item.product.name,
                        'unit': item.product.unit
                    },
                    'needed_amount': item.needed_amount,
                    'amount_with_extra': item.amount_with_extra
                })
            
            data.append({
                'id': meal_request.id,
                'meal_type': {
                    'id': meal_request.meal_type.id,
                    'name': meal_request.meal_type.name
                },
                'children_count': meal_request.children_count,
                'use_extra': meal_request.use_extra,
                'status': meal_request.status,
                'created_at': meal_request.created_at.isoformat(),
                'items': items
            })
        
        return Response(data)
