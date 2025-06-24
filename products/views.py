from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Product, StockLot


class ProductsListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        stock_lots = StockLot.objects.select_related('product').all()
        data = []
        
        for stock in stock_lots:
            if stock.quantity <= 0:
                status_val = "danger"
            elif stock.quantity < 50:
                status_val = "warning"
            else:
                status_val = "ok"
            
            data.append({
                'id': stock.id,
                'product': {
                    'id': stock.product.id,
                    'name': stock.product.name,
                    'unit': stock.product.unit
                },
                'quantity': stock.quantity,
                'status': status_val,
                'updated_at': stock.updated_at.isoformat()
            })
        
        return Response(data)


class ProductCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Faqat admin mahsulot qo'sha oladi
        if request.user.role != 'admin':
            return Response(
                {"error": "Faqat admin mahsulot qo'sha oladi"}, 
                status=status.HTTP_403_FORBIDDEN
            )
        
        name = request.data.get('name')
        unit = request.data.get('unit', 'kg')
        quantity = request.data.get('quantity', 0)
        
        if not name:
            return Response(
                {"error": "Mahsulot nomi majburiy"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            quantity = float(quantity)
        except ValueError:
            return Response(
                {"error": "Miqdor raqam bo'lishi kerak"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Mahsulot yaratish yoki yangilash
        product, created = Product.objects.get_or_create(
            name=name,
            defaults={'unit': unit}
        )
        
        # Stock yaratish yoki yangilash
        stock_lot, stock_created = StockLot.objects.get_or_create(
            product=product,
            defaults={'quantity': quantity}
        )
        
        if not stock_created:
            stock_lot.quantity += quantity
            stock_lot.save()
        
        return Response({
            "detail": f"Mahsulot {'yaratildi' if created else 'yangilandi'}!",
            "product": {
                "id": product.id,
                "name": product.name,
                "unit": product.unit,
                "quantity": stock_lot.quantity
            }
        }, status=status.HTTP_201_CREATED)
