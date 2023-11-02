FROM node

WORKDIR /home/node/app
COPY package*.json .
RUN npm ci && npm cache clean --force

COPY . .