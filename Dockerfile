# syntax=docker/dockerfile:1

FROM node:15.14.0
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install -g typescript
RUN npm install --production
COPY . .

CMD [ "npm","start"]