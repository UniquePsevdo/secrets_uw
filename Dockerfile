FROM node:8.9.4

# Create app directory
WORKDIR /app

# Install app dependencies
# COPY package.json .
# For npm@5 or later, copy package-lock.json as well
COPY package.json package-lock.json ./
# COPY package.json yarn.lock ./
# RUN yarn install --frozen-lockfile --no-cache --production
COPY src/assets/locales ./src/assets/locales/
RUN npm install

# Bundle app source
COPY dist ./dist/

EXPOSE 8081

USER node

CMD [ "node", "dist/server.js" ]
# /Users/mac/WebstormProjects