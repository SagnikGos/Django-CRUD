from django.db import models



class Item(models.Model):
    name = models.CharField(max_length=200)  # Short text field
    description = models.TextField()  # Long text field

    def __str__(self):
        return self.name  # Show name when printing

