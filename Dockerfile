#develop build
FROM node:12-alpine
WORKDIR /app
ENV NODE_ENV develop
COPY package.json package-lock.json /app/
RUN npm ci
COPY config /app/config
COPY src /app/src
CMD ["npm", "start"]
