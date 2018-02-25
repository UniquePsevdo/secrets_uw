FROM node:8.9.4
WORKDIR usr/src/spp
COPY package.json package-lock.json ./
COPY src/assets/locales ./src/assets/locales/
RUN npm install
COPY dist ./dist/
EXPOSE 8081
USER node
CMD [ "node", "dist/server.js" ]