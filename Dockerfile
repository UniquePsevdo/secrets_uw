FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# COPY package.json .
# For npm@5 or later, copy package-lock.json as well
COPY package.json package-lock.json ./
# COPY package.json yarn.lock ./
# RUN yarn install --frozen-lockfile --no-cache --production

RUN npm install

# Bundle app source
COPY dist ./dist/

EXPOSE 8080

USER node

CMD [ "node", "dist/server.js" ]
