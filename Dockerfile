# syntax=docker/dockerfile:1

FROM node:15.14.0
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]
COPY .env.production ./.env
RUN npm install -g typescript
RUN npm install --production
COPY . .
RUN rm -rf .env.development
RUN rm -rf .env.production
CMD [ "bash"]