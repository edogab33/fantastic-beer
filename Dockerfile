# Installs Node.js image
FROM node:19.1-alpine

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json", "tsconfig.json", "./"]

COPY ./src ./src

RUN npm install

CMD npm run dev