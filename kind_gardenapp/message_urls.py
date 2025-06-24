from django.urls import path
from .views import MessagesListView, MessageCreateView, MessageReplyView

urlpatterns = [
    path('messages/', MessagesListView.as_view(), name='messages-list'),
    path('messages/create/', MessageCreateView.as_view(), name='message-create'),
    path('messages/reply/', MessageReplyView.as_view(), name='message-reply'),
]
