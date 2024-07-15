from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Recipe
from django.shortcuts import get_object_or_404
import json

def recipe_list(request):
    """
    Return a list of all recipes, but only title and image URL.
    """
    recipes = Recipe.objects.all().values('id', 'title', 'image_url')
    return JsonResponse(list(recipes), safe=False)

def recipe_detail(request, id):
    """
    Return all details of a specific recipe.
    """
    recipe = get_object_or_404(Recipe, pk=id)
    data = {
        'id': recipe.id,
        'title': recipe.title,
        'description': recipe.description,
        'image_url': recipe.image_url,
    }
    return JsonResponse(data)

@csrf_exempt
def create_recipe(request):
    """
    POST a new recipe to the database.
    This method handles POST requests to create a new recipe entry in the database.
    """
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        new_recipe = Recipe.objects.create(
            title=data.get('title', ''),
            description=data.get('description', 'No description provided'),
            image_url=data.get('image_url', '')  # Corrected from 'image' to 'image_url'
        )
        return JsonResponse({
            'id': new_recipe.id,
            'title': new_recipe.title,
            'description': new_recipe.description,
            'image_url': new_recipe.image_url
        }, status=201)
    else:
        return HttpResponse(status=405)