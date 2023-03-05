# 🧭 server

This is the backend server for Compass.

## Running tests

The database container does not need to be started to run tests, but Docker Desktop must be running in the background.

Run all tests with `npm run test`. An individual test file can be run with `npm run test <path/to/file>` (e.x. `npm run test src/routes/students.test.ts`).

To run tests in watch mode, use `npm run test:watch`. This will run tests whenever a file is changed, but will not take database schema changes into account.

## Database

### Creating migrations

Until Compass is deployed, the initial migration file at `src/db/migrations/1_initial-migrations.sql` should be edited. Once Compass is deployed, new migrations can be created in the same directory by adding `1` to the number of the last migration file.

### Running migrations

Run `npm run db:migrate` to migrate the database. However, until Compass is deployed, you'll more likely want to run `npm run db:reset` to reset the database since we'll be making changes to the initial migration file.

## Tech stack & libraries

- [Express](https://expressjs.com/)
- [Winston](https://github.com/winstonjs/winston)
- [PostgreSQL](https://www.postgresql.org/)
- [Kysely](https://github.com/koskimas/kysely) (type-safe SQL query builder)
- [Zapatos](https://github.com/jawj/zapatos) (type-safe Postgres helpers, mostly used to generate typings for Kysely)
- [AVA](https://github.com/avajs/ava) (test runner)
