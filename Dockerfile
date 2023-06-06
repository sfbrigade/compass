# Start with the latest Node.js LTS release
FROM --platform=linux/amd64 node:18-bullseye-slim

# Set env variables
ENV NODE_ENV production
ENV APP_HOME=/opt/node/app

USER node:node
WORKDIR $APP_HOME

COPY --chown=node:node package*.json .

# We install Husky via a "prepare" lifecycle script - disable it in prod
# See: https://typicode.github.io/husky/guide.html#disable-husky-in-ci-docker-prod
RUN npm pkg delete scripts.prepare
RUN npm ci

# Copy the project files into the app directory
COPY --chown=node:node . $APP_HOME

# Build and run the optimized version of the app 
RUN npm run build
CMD npm run db:migrate && npm run start
# CMD npm run start
