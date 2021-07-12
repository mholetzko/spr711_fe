# syntax=docker/dockerfile:1

FROM node:15.14.0
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
COPY . .
RUN npm run build 
RUN npm install -g serve

CMD ["serve","-s","build"]