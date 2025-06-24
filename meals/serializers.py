from rest_framework import serializers
from meals.models import MealRequest

class MealRequestCreateSerializer(serializers.ModelSerializer):
    children_ids = serializers.ListField(
        child=serializers.IntegerField(), write_only=True
    )

    class Meta:
        model = MealRequest
        fields = ['id', 'date', 'chef', 'children_ids']
        read_only_fields = ['id', 'chef', 'date']

    def create(self, validated_data):
        children_ids = validated_data.pop('children_ids', [])
        user = self.context['request'].user
        meal_request = MealRequest.objects.create(chef=user)
        meal_request.children.set(children_ids)
        meal_request.save()
        return meal_request
