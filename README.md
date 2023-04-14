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
   cd <parent folder of project compass>
   git clone https://github.com/sfbrigade/compass.git
   cd project-compass
   ```
   - _Windows users_: make sure that the git autocrlf setting is set to false so that carriage return characters are not inserted into files (which breaks them when they run inside the Linux container). To do so, open a Powershell and run: `git config --global core.autocrlf false`
3. Create the local server env file:
   ```sh
   cp .env.example .env.local
   ```

### Running Compass

There are three ways to run Compass locally:

**Option 1: Run client, server and database in docker (easiest to get started)**

1. Bring up the server, client and database

   ```sh
   cd docker/dev
   docker compose up
   ```

2. Wait a bit for the image to build, then visit http://localhost:3000

**Option 2: Run client and server locally, and database in Docker**

1. Install node dependencies, starting in the `project-compass` directory

   ```sh
   npm install           # install dependencies
   ```

2. Start Postgres inside a Docker container

   ```sh
   cd docker/postgres
   docker compose up -d  # start the database
   cd ../..              # return to the project-compass directory
   npm run db:reset      # reset and migrate the database
   ```

3. Start the server

   ```sh
   npm run dev           # start the server in development mode
   ```

   Server URL: http://localhost:3000

**Option 3: Run client, server and database locally**

0. One time setup:

- Install Postgres from your preferred source ([pgAdmin 4](https://www.postgresql.org/download/), [Homebrew](https://wiki.postgresql.org/wiki/Homebrew), ...)
- Create a username and password on the Postgres server.
- Update the `DATABASE_URL` in _server/.env.local_ to include your actual `<username>` and `<password>`:
  ```
  DATABASE_URL=postgres://<username>:<password>@localhost:5432/compass
  ```

1. Launch your local Postgres instance

2. Install node dependencies, starting in the `project-compass` directory

   ```sh
   npm install           # install dependencies
   ```

3. Reset the database and bring up the server

   ```sh
   npm run db:reset      # reset and migrate the database
   npm run dev           # start the server in development mode
   ```

   Server URL: http://localhost:3000

### Running tests

The database container does not need to be started to run tests, but Docker Desktop must be running in the background.

Run all tests with `npm run test`. An individual test file can be run with `npm run test <path/to/file>` (e.x. `npm run test src/routes/students.test.ts`).

To run tests in watch mode, use `npm run test:watch`. This will run tests whenever a file is changed, but will not take database schema changes into account.

### Database

#### Creating migrations

Until Compass is deployed, the initial migration file at `src/api/db/migrations/1_initial-migrations.sql` should be edited. Once Compass is deployed, new migrations can be created in the same directory by adding `1` to the number of the last migration file.

#### Running migrations

Run `npm run db:migrate` to migrate the database. However, until Compass is deployed, you'll more likely want to run `npm run db:reset` to reset the database since we'll be making changes to the initial migration file.

## Tech stack & libraries

- [Winston](https://github.com/winstonjs/winston)
- [PostgreSQL](https://www.postgresql.org/)
- [Kysely](https://github.com/koskimas/kysely) (type-safe SQL query builder)
- [Zapatos](https://github.com/jawj/zapatos) (type-safe Postgres helpers, mostly used to generate typings for Kysely)
- [AVA](https://github.com/avajs/ava) (test runner)
