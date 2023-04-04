# 🧭 Project Compass

Compass is a tool to help educators create and manage Individualized Education Programs (IEPs) for better student outcome.

Useful resources:

- [Notion wiki](https://www.notion.so/Compass-source-of-truth-9a02b2ee92144ef99d51999e74ccde1c)
- [Slack channel](https://sfbrigade.slack.com/archives/C01R8E75N1K)

## Contributing to our code base

### One time setup

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
2. Clone the github repo:
   ```sh
   cd <parent folder of project-compass>
   git clone https://github.com/sfbrigade/project-compass.git
   cd project-compass
   ```
   - _Windows users_: make sure that the git autocrlf setting is set to false so that carriage return characters are not inserted into files (which breaks them when they run inside the Linux container). To do so, open a Powershell and run: `git config --global core.autocrlf false`
3. Create the local server env file
   ```sh
   cp server/.env.example server/.env.local
   ```

There are three ways to run Compass locally

### **Option 1: Run client, server and database in docker (recommended)**

1. Bring up the server, client and database

   ```
   docker compose up
   ```

2. Wait a bit for the image to build, it should start both the client and server in development mode.

   - Client url: http://localhost:3000
   - Server url: http://localhost:8080/health

### Option 2: Run client and server locally, and database in docker

1. Install node dependencies, starting in the `project-compass` directory

   ```sh
   npm install           # install dependencies
   ```

2. Bring up the database in docker and the server, starting in the `project-compass` directory

   ```sh
   cd server
   docker compose up -d  # start the database
   npm run db:reset      # reset and migrate the database
   npm run dev           # start the server in development mode
   ```

   Server url: http://localhost:8080/health

3. Bring up the client in a separate terminal, starting in the `project-compass` directory
   ```sh
   cd client
   npm run dev           # start the server in development mode
   ```
   Client url: http://localhost:3000

### Option 3: Run client, server and database locally

0. One time setup:

- Install Postgresql db from your preferred source ([pgAdmin 4](https://www.postgresql.org/download/), [Homebrew](https://wiki.postgresql.org/wiki/Homebrew), ...)
- Create a username and password on the Postgres server.
- Update the `DATABASE_URL` in _server/.env.local_ to include your actual `<username>` and `<password>`:
  ```
  DATABASE_URL=postgres://<username>:<password>@localhost:5432/compass
  ```

1. Launch the local Postgresql

2. Reset the database and bring up the server, starting in the `project-compass` directory

   ```sh
   cd server
   npm run db:reset      # reset and migrate the database
   npm run dev           # start the server in development mode
   ```

   Server url: http://localhost:8080/health

3. Bring up the client in a separate terminal, starting in the `project-compass` directory
   ```sh
   cd client
   npm run dev           # start the server in development mode
   ```
   Client url: http://localhost:3000
