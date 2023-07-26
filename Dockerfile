# Dockerfile to build an optimized version of the Compass server.
#
# To run the production image locally, create a .env.production file with the
# appropriate env vars (a copy of .env.local works - see NOTE below).
#
# Command to build and run a Docker image for production:
#  % docker build . -t compass && docker run -p=3000:3000 --name=compass --rm --env-file=.env.production compass
#
# If the target platform is Apple M1 or other ARM platform, use this command to build:
#  % docker build --platform=linux/arm64 .
#
# NOTE: If you have the references to `localhost` in the .env file for other
# services like postgres, replace `localhost` with either `host.docker.internal`
# or the local IP address (`% ipconfig getifaddr en0`). This is needed as the
# docker image runs in its own VM and `localhost` resolves to is own VM, not
# the host.


# Start with the latest Node.js LTS release
FROM --platform=linux/amd64 node:18-bullseye-slim

# Set env variables
ENV NODE_ENV production
ENV APP_HOME=/opt/node/app

USER node:node
WORKDIR $APP_HOME

COPY --chown=node:node package*.json ./

# We install Husky via a "prepare" lifecycle script - disable it in prod
# See: https://typicode.github.io/husky/guide.html#disable-husky-in-ci-docker-prod
RUN npm pkg delete scripts.prepare && npm pkg delete scripts.postinstall
RUN npm ci

# Copy the project files into the app directory
COPY --chown=node:node . $APP_HOME

# Build the optimized version of the app
RUN npm run build

# Always the run the database migrations to make prod maintenance easier
CMD npm run db:migrate && npm run start
