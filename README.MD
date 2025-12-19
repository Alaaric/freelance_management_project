## Prérequis

- Docker et Docker Compose

## Installation

1. Cloner le projet
2. Créer un fichier `.env` à partir du fichier `.env.sample` :
3. Modifier les variables d'environnement dans `.env` si nécessaire

## Démarrage avec Docker

```bash
# Lancer l'application
docker-compose up --build

# Arrêter l'application
docker-compose down -v
```

L'application démarre avec des seeds de test pré-chargées automatiquement :
- 5 freelances avec différentes compétences et TJM
- 3 entreprises dans différents secteurs
- 5 projets avec des compétences requises variées

## Documentation API

La documentation de l'API est disponible une fois le serveur lancé :

**http://localhost:3000/api-docs**

## API Endpoints

Les endpoints suivants sont disponibles avec des requêtes prêtes à tester dans le fichier `requests.http`.

### Health
- `GET /health` - Vérifier l'état de l'API

### Freelances
- `POST /api/v1/freelances` - Créer un freelance
- `GET /api/v1/freelances` - Lister tous les freelances
  - Query param: `?skill=Python` - Filtrer par compétence
- `GET /api/v1/freelances/:id` - Récupérer un freelance
- `GET /api/v1/freelances/:id/projets-compatibles` - Projets compatibles (avec score)
- `POST /api/v1/freelances/:id/postuler/:projetId` - Postuler à un projet

### Entreprises
- `POST /api/v1/entreprises` - Créer une entreprise
- `GET /api/v1/entreprises` - Lister toutes les entreprises
- `GET /api/v1/entreprises/:id` - Récupérer une entreprise
- `POST /api/v1/entreprises/:id/projets` - Créer un projet
- `GET /api/v1/entreprises/:id/projets` - Lister les projets d'une entreprise
- `GET /api/v1/entreprises/:id/projets/:projetId/candidats-compatibles` - Candidats compatibles (avec score)

### Projets
- `GET /api/v1/projets/ouverts` - Lister tous les projets non pourvus

## Score de compatibilité

Les endpoints de matching retournent un `compatibilityScore` (0-100%)
