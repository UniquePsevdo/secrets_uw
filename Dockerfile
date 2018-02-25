FROM node:8.9.4
WORKDIR usr/src/app
RUN npm install
COPY dist ./dist/
COPY src/assets/locales ./src/assets/locales/
COPY package.json package-lock.json ./
EXPOSE 8081
USER node
CMD [ "node", "dist/server.js" ]