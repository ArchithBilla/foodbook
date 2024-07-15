from django.db import models


class Recipe(models.Model):
    title = models.CharField(max_length=200)
    image_url = models.URLField()
    description = models.TextField()
    review = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title