FROM node:8.9.4
WORKDIR usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY ./src/assets/locales/ ./src/assets/locales/
COPY ./dist/ ./dist/
EXPOSE 8081
USER node
CMD [ "node", "dist/server.js" ]