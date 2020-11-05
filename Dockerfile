#develop build
FROM node:12-alpine as develop
WORKDIR /app
ENV NODE_ENV develop
COPY package.json package-lock.json /app/
RUN npm ci
COPY config /app/config
COPY src /app/src
CMD ["npm", "start"]

#staging build
FROM node:12-alpine as staging
WORKDIR /app
ENV NODE_ENV staging
COPY package.json package-lock.json /app/
RUN npm ci
COPY config /app/config
COPY src /app/src
CMD ["npm", "run", "start:staging"]

#production build
FROM node:12-alpine as production
WORKDIR /app
ENV NODE_ENV production
COPY package.json package-lock.json /app/
RUN npm ci
COPY config /app/config
COPY src /app/src
CMD ["npm", "run", "start:production"]