from rest_framework import serializers

class ChildSerializer(serializers.ModelSerializer):
    class Meta:
        model = 'Child'
        fields = '__all__'