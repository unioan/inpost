FROM node:23-slim

WORKDIR /app

COPY package*.json ./
COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/

RUN rm -rf node_modules frontend/node_modules backend/node_modules && \
    npm install && \
    npm install --prefix frontend && \
    npm install --prefix backend

COPY . .

ENV PORT=3000
EXPOSE 3000

CMD [ "npm", "run", "deploy" ]