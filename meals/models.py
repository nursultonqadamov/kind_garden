from django.db import models
from django.conf import settings
from products.models import Product

class Recipe(models.Model):
    """Default recipes for meals"""
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.name

class RecipeIngredient(models.Model):
    """Ingredients needed per portion for each recipe"""
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='ingredients')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    amount_per_portion = models.FloatField()  # Amount needed per 1 portion
    
    def __str__(self):
        return f"{self.recipe.name} - {self.product.name}: {self.amount_per_portion}{self.product.unit}"

class MealRequest(models.Model):
    """Simplified meal request - just portions count"""
    chef = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    portions_count = models.IntegerField()  # Number of portions needed
    created_at = models.DateTimeField(auto_now_add=True)
    is_completed = models.BooleanField(default=False)
    
    def __str__(self):
        return f"#{self.id} - {self.recipe.name} x{self.portions_count}"

class MealRequestItem(models.Model):
    """Calculated ingredients needed for the meal request"""
    meal_request = models.ForeignKey(MealRequest, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    amount_needed = models.FloatField()  # Total amount needed
    amount_taken = models.FloatField(default=0)  # Amount actually taken
    is_over_limit = models.BooleanField(default=False)  # If taken > 115% of needed
    
    def __str__(self):
        return f"{self.product.name}: {self.amount_needed}{self.product.unit}"
    
    @property
    def max_allowed(self):
        """Maximum allowed to take (115% of needed)"""
        return self.amount_needed * 1.15
    
    @property
    def percentage_taken(self):
        """Percentage of needed amount that was taken"""
        if self.amount_needed > 0:
            return (self.amount_taken / self.amount_needed) * 100
        return 0

class DailyReport(models.Model):
    """Reports for admin"""
    meal_request = models.ForeignKey(MealRequest, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    amount_needed = models.FloatField()
    amount_taken = models.FloatField()
    is_over_limit = models.BooleanField(default=False)
    date = models.DateField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.product.name} - {self.date}"
    
    @property
    def percentage_taken(self):
        if self.amount_needed > 0:
            return (self.amount_taken / self.amount_needed) * 100
        return 0
