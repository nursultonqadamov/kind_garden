from django.shortcuts import render
from children.models import Child
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator

@method_decorator(login_required, name='dispatch')
class MealRequestFormView(View):
    def get(self, request):
        children = Child.objects.all()
        return render(request, 'meals/meal_request_form.html', {'children': children})
