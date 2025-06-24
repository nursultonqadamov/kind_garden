from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import DailyUsageReport, Message
from users.models import User


class UsageReportsListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        reports = DailyUsageReport.objects.select_related('product').order_by('-date', '-id')
        data = []
        
        for report in reports:
            data.append({
                'id': report.id,
                'date': report.date.isoformat(),
                'product': {
                    'id': report.product.id,
                    'name': report.product.name,
                    'unit': report.product.unit
                },
                'amount_used': report.amount_used,
                'expected_amount': report.expected_amount,
                'cook_name': report.cook_name,
                'used_extra': report.used_extra,
                'is_overused': report.is_overused,
                'warning_message': report.warning_message
            })
        
        return Response(data)


class MessagesListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role == 'admin':
            messages = Message.objects.filter(parent_message=None).select_related('sender', 'receiver')
        else:
            messages = Message.objects.filter(
                sender=request.user, 
                parent_message=None
            ).select_related('sender', 'receiver')
        
        data = []
        for message in messages:
            replies = []
            for reply in message.replies.all():
                replies.append({
                    'id': reply.id,
                    'sender': reply.sender.get_full_name() or reply.sender.username,
                    'content': reply.content,
                    'created_at': reply.created_at.isoformat(),
                    'is_read': reply.is_read
                })
            
            data.append({
                'id': message.id,
                'sender': message.sender.get_full_name() or message.sender.username,
                'receiver': message.receiver.get_full_name() if message.receiver else 'Admin',
                'message_type': message.message_type,
                'message_type_display': message.get_message_type_display(),
                'subject': message.subject,
                'content': message.content,
                'is_read': message.is_read,
                'is_urgent': message.is_urgent,
                'created_at': message.created_at.isoformat(),
                'replies': replies
            })
        
        return Response(data)


class MessageCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        subject = request.data.get('subject')
        content = request.data.get('content')
        message_type = request.data.get('message_type', 'general')
        is_urgent = request.data.get('is_urgent', False)
        
        if not subject or not content:
            return Response(
                {"error": "Subject va content majburiy"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if request.user.role == 'cook':
            admin_user = User.objects.filter(role='admin').first()
            receiver = admin_user
        else:
            receiver = None
        
        message = Message.objects.create(
            sender=request.user,
            receiver=receiver,
            message_type=message_type,
            subject=subject,
            content=content,
            is_urgent=is_urgent
        )
        
        return Response({
            "detail": "Xabar muvaffaqiyatli yuborildi!",
            "message_id": message.id
        }, status=status.HTTP_201_CREATED)


class MessageReplyView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        parent_message_id = request.data.get('parent_message_id')
        content = request.data.get('content')
        
        if not parent_message_id or not content:
            return Response(
                {"error": "parent_message_id va content majburiy"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        parent_message = get_object_or_404(Message, id=parent_message_id)
        
        reply = Message.objects.create(
            sender=request.user,
            receiver=parent_message.sender,
            subject=f"Re: {parent_message.subject}",
            content=content,
            parent_message=parent_message
        )
        
        return Response({
            "detail": "Javob muvaffaqiyatli yuborildi!",
            "reply_id": reply.id
        }, status=status.HTTP_201_CREATED)
