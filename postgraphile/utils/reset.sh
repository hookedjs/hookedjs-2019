#!/bin/bash
set -e
export NODE_ENV=development
SCRIPTS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

if [ -x ${SCRIPTS_DIR}/../../.env ]; then
  . ${SCRIPTS_DIR}/../../.env
  if [ "$SUPERUSER_PASSWORD" = "" ]; then
    echo ".env already exists, but it doesn't define SUPERUSER_PASSWORD - aborting!"
    exit 1;
  fi
  if [ "$AUTH_USER_PASSWORD" = "" ]; then
    echo ".env already exists, but it doesn't define AUTH_USER_PASSWORD - aborting!"
    exit 1;
  fi
  echo "Configuration already exists, using existing secrets."
else
  echo "Configuration D.N.E.."
  exit 1;
fi


echo "Installing or reinstalling the roles and database..."
# Now we can reset the database
psql -X -v ON_ERROR_STOP=1 template1 <<SQL
-- RESET database
DROP DATABASE IF EXISTS graphiledemo;
DROP DATABASE IF EXISTS graphiledemo_test;
DROP DATABASE IF EXISTS graphile_org_demo;
DROP ROLE IF EXISTS graphiledemo_visitor;
DROP ROLE IF EXISTS graphiledemo_admin;
DROP ROLE IF EXISTS graphiledemo_authenticator;
DROP ROLE IF EXISTS graphiledemo;

-- Now to set up the database cleanly:

-- Ref: https://devcenter.heroku.com/articles/heroku-postgresql#connection-permissions

-- This is the root role for the database
CREATE ROLE graphiledemo WITH LOGIN PASSWORD '${SUPERUSER_PASSWORD}' SUPERUSER;

-- This is the no-access role that PostGraphile will run as by default
CREATE ROLE graphiledemo_authenticator WITH LOGIN PASSWORD '${AUTH_USER_PASSWORD}' NOINHERIT;

-- This is the role that PostGraphile will switch to (from graphiledemo_authenticator) during a transaction
CREATE ROLE graphiledemo_visitor;

-- This enables PostGraphile to switch from graphiledemo_authenticator to graphiledemo_visitor
GRANT graphiledemo_visitor TO graphiledemo_authenticator;

-- Here's our main database
CREATE DATABASE graphiledemo OWNER graphiledemo;
REVOKE ALL ON DATABASE graphiledemo FROM PUBLIC;
GRANT CONNECT ON DATABASE graphiledemo TO graphiledemo;
GRANT CONNECT ON DATABASE graphiledemo TO graphiledemo_authenticator;
GRANT ALL ON DATABASE graphiledemo TO graphiledemo;

-- Some extensions require superuser privileges, so we create them before migration time.
\\connect graphiledemo
CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
CREATE EXTENSION IF NOT EXISTS citext;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- This is a copy of the setup above for our test database
CREATE DATABASE graphiledemo_test OWNER graphiledemo;
REVOKE ALL ON DATABASE graphiledemo_test FROM PUBLIC;
GRANT CONNECT ON DATABASE graphiledemo_test TO graphiledemo;
GRANT CONNECT ON DATABASE graphiledemo_test TO graphiledemo_authenticator;
GRANT ALL ON DATABASE graphiledemo_test TO graphiledemo;
\\connect graphiledemo_test
CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
CREATE EXTENSION IF NOT EXISTS citext;
CREATE EXTENSION IF NOT EXISTS pgcrypto;
SQL

echo "Roles and databases created, now sourcing the initial database schema"
psql -X1 -v ON_ERROR_STOP=1 "${ROOT_DATABASE_URL}" -f ${SCRIPTS_DIR}/../sql/seed.sql

source ${SCRIPTS_DIR}/schema_dump.sh
