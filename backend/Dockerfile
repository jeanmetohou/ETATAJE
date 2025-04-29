# Étape 1 : Construction de l'image
FROM node:18 AS builder


WORKDIR /app


# Copier les fichiers de dépendances
COPY package*.json ./


# Installer les dépendances
RUN npm install --production


# Copier le reste des fichiers
COPY . .


# Compiler le code
RUN npm run build


# Exposer le port sur lequel l'application écoute
EXPOSE 3001


# Commande pour démarrer l'application
CMD ["npm", "run", "start"]