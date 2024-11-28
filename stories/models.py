from django.db import models

class Story(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    title = models.CharField(max_length=255)
    content = models.TextField()
    file = models.FileField(upload_to='stories_pdfs/', null=True, blank=True)
    is_published = models.BooleanField(default=False)

    def __str__(self):
        return self.title