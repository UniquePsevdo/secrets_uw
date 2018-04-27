FROM node:8.9.4
WORKDIR usr/src/app
COPY ${BUILD_DIR} ./${BUILD_DIR}/
COPY locales ./locales/
COPY package.json package-lock.json ./
RUN npm install
EXPOSE 8081
USER node
CMD [ "node", "${BUILD_DIR}/server.js" ]