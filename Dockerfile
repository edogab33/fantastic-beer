# Installs Node.js image
FROM node:19.1-alpine

ENV NODE_ENV development

RUN npm install --global nodemon

WORKDIR /usr/app

COPY ["package.json", "package-lock.json", "tsconfig.json", "./app"]

COPY . .

RUN npm install

CMD npm run dev
