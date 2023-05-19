# Start with the latest Node.js LTS release
FROM node:18-bullseye-slim

# TODO: figure out why this doesn't work
# ENV NODE_ENV production

# Set an env variable for the location of the app files
ENV APP_HOME=/opt/node/app

# TODO: figure out why this is needed
# update path to include any installed node module executables
RUN echo "export PATH=./node_modules/.bin:\$PATH\n" >> /root/.bashrc

# TODO: Can this be removed?
# RUN wget -q https://www.postgresql.org/media/keys/ACCC4CF8.asc -O - | apt-key add - && \
#     echo "deb http://apt.postgresql.org/pub/repos/apt/ bullseye-pgdg main" >> /etc/apt/sources.list.d/pgdg.list && \
#     apt-get update -y && \
#     apt-get install -y postgresql-client-15 && \
#     apt-get clean

# TODO: figure out why this is needed. Commenting it out seems to be ok
# Create a directory for the server app to run from
# RUN mkdir -p $APP_HOME

# Set workdir and install dependencies
USER node
WORKDIR $APP_HOME

COPY package.json .
COPY package-lock.json .

# TODO: figure out why this add --omit=dev doesn't work
RUN npm ci

# Copy the project files into the app directory
COPY --chown=node:node . $APP_HOME

# Figure out how to get this to work with `command` in docker-compose.yml
# RUN npm run build
# CMD ["npm", "run", "start"]
