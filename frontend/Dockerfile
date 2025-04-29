# Étape 1 : Construction de l'image
FROM node:18 AS builder


WORKDIR /app


# Copier les fichiers de dépendances
COPY package*.json ./


# Installer les dépendances
RUN npm install


# Copier le reste des fichiers
COPY . .


# Construire le projet React
RUN npm run build


# Exposer le port sur lequel le frontend écoute
EXPOSE 3000


# Commande pour démarrer le frontend
CMD ["npm", "run", "start"]
