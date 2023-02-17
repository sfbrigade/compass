#!/usr/bin/env bash

# wait for postgres to accept connections...
while !</dev/tcp/database/5432; do
  sleep 1
done

# check if database exists- if not, create and run migrations and seeds
psql ${DATABASE_URL} -c '' > /dev/null 2>&1
RESULT=$?
if [ $RESULT -ne 0 ]; then
  npm run db:reset -w server
fi
