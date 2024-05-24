# Database MongoDB con Docker 🐳

Questo progetto include un `Dockerfile` e un `docker-compose.yml` per eseguire un'istanza di MongoDB in un container Docker.

## Requisiti 📋

- Docker
- Docker Compose

## Configurazione 🛠️

1. Clona questo repository.
2. Crea un file `.env` nella directory principale basandoti sul file `.env.example` incluso.
3. Inserisci le tue credenziali di MongoDB nel file `.env`.

## Avvio 🚀

Per avviare il database, esegui il seguente comando:

```bash
docker-compose up --build
