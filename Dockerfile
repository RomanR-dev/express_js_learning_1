FROM node:22
LABEL authors="Roma"

COPY frontend /app
WORKDIR /app
RUN apt-get update && apt-get install -y nodejs npm
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]