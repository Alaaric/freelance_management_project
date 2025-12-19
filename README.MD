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

## Documentation API

La documentation de l'API est disponible une fois le serveur lancé :

**http://localhost:3000/api-docs**

## API Endpoints

Les endpoints suivants sont disponibles avec des requêtes prêtes à tester dans le fichier `requests.http`.

### Freelances
- `POST /api/freelances` - Créer un freelance
- `GET /api/freelances` - Lister tous les freelances
- `GET /api/freelances/:id` - Récupérer un freelance
- `GET /api/freelances/:id/projets-compatibles` - Projets compatibles
- `POST /api/freelances/:id/postuler/:projetId` - Postuler à un projet

### Entreprises
- `POST /api/entreprises` - Créer une entreprise
- `GET /api/entreprises` - Lister toutes les entreprises
- `GET /api/entreprises/:id` - Récupérer une entreprise
- `POST /api/entreprises/:id/projets` - Créer un projet
- `GET /api/entreprises/:id/projets` - Lister les projets d'une entreprise
- `GET /api/entreprises/:id/projets/:projetId/candidats-compatibles` - Candidats compatibles
