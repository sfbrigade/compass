# Dockerfile to build an optimized version of the Compass server.
#
# To run the production image locally, create a .env.production file with the
# appropriate env vars (a copy of .env.local works - see NOTE below).
#
# Command to build and run a Docker image:
#  % docker build . -t compass && docker run -p=3000:3000 --name=compass --rm --env-file=.env.production compass
#
# NOTE: If you have the references to `localhost` in the .env file for other
# services like postgres, replace `localhost` with the local IP address, e.g.
# using `% ipconfig getifaddr en0`. This is needed as the docker image run in
# its own VM and `localhost` resolves to to is own VM, not the host.

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

# Build the optimized version of the app
RUN npm run build

# Always the run the database migrations to make prod maintenance easier
CMD npm run db:migrate && npm run start
