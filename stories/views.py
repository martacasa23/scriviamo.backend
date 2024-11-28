from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListAPIView
from .models import Story
from .serializers import StorySerializer

class StoryViewSet(viewsets.ModelViewSet):
    queryset = Story.objects.all()
    serializer_class = StorySerializer

    @action(detail=True, methods=['post'])
    def publish(self, request, pk=None):
        try:
            story = self.get_object()
            story.is_published = True  # Cambia lo stato a pubblicato
            story.save()
            return Response({'status': 'Storia pubblicata con successo!'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class PublishedStoriesView(ListAPIView):
    queryset = Story.objects.filter(is_published=True)
    serializer_class = StorySerializer
