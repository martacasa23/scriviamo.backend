from django.urls import path, include  # Importa i moduli necessari per la gestione degli URL.
from rest_framework.routers import DefaultRouter  # Importa il router di Django REST Framework.
from .views import StoryViewSet, PublishedStoriesView  # Importa i viewset e le views necessarie.

# Crea un'istanza di DefaultRouter. Questo router automatizza la creazione degli URL per il ViewSet.
router = DefaultRouter()
# Registra il viewset per la risorsa 'stories'. Questo creerà automaticamente gli URL per la visualizzazione e manipolazione delle storie.
router.register(r'stories', StoryViewSet)

# Lista degli URL per la tua applicazione.
urlpatterns = [
    # Questo percorso gestisce le richieste per ottenere le storie pubblicate. 
    # Viene usato il view PublishedStoriesView che restituisce la lista delle storie pubblicate.
    path('stories/published/', PublishedStoriesView.as_view(), name='published-stories'),

    # Questa riga include gli URL automaticamente generati dal router per il viewset StoryViewSet.
    # Questo aggiunge URL per creare, aggiornare, eliminare e visualizzare le storie.
    path('', include(router.urls)),
]
