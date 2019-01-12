#!/bin/bash
set -e
export NODE_ENV=development

yarn install
npx lerna bootstrap

if [ ! -d postgraphile/sql ]; then
    cp -r postgraphile/sql.example postgraphile/sql
fi

if [ ! -x server-koa2/Config.ts ]; then
    cp server-koa2/Config.example.ts server-koa2/Config.ts
fi

if [ ! -d client-web/build ]; then
    cp -r client-web/build.example client-web/build
fi


if [ -x .env ]; then
  . .env
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
  # This will generate passwords that are safe to use in envvars without needing to be escaped:
  SUPERUSER_PASSWORD="$(openssl rand -base64 30 | tr '+/' '-_')"
  AUTH_USER_PASSWORD="$(openssl rand -base64 30 | tr '+/' '-_')"

  # This is our '.env' config file, we're writing it now so that if something goes wrong we won't lose the passwords.
  cat >> .env <<CONFIG
# This is a development environment (production wouldn't write envvars to a file)
export NODE_ENV="development"

# Password for the 'graphiledemo' user, which owns the database
export SUPERUSER_PASSWORD="$SUPERUSER_PASSWORD"

# Password for the 'graphiledemo_authenticator' user, which has very limited
# privileges, but can switch into graphiledemo_visitor
export AUTH_USER_PASSWORD="$AUTH_USER_PASSWORD"

# This secret is used for signing cookies
export SECRET="$(openssl rand -base64 48)"

# This secret is used for signing JWT tokens (we don't use this by default)
export JWT_SECRET="$(openssl rand -base64 48)"


# These are the connection strings for the DB and the test DB.
export ROOT_DATABASE_URL="postgresql://graphiledemo:\$SUPERUSER_PASSWORD@localhost/graphiledemo"
export AUTH_DATABASE_URL="postgresql://graphiledemo_authenticator:\$AUTH_USER_PASSWORD@localhost/graphiledemo"
export TEST_ROOT_DATABASE_URL="postgresql://graphiledemo:\$SUPERUSER_PASSWORD@localhost/graphiledemo_test"
export TEST_AUTH_DATABASE_URL="postgresql://graphiledemo_authenticator:\$AUTH_USER_PASSWORD@localhost/graphiledemo_test"

# This port is the one you'll connect to
export PORT=3000

# This is the port that create-react-app runs as, don't connect to it directly
export CLIENT_PORT=8350

# This is needed any time we use absolute URLs, e.g. for OAuth callback URLs
export ROOT_DOMAIN="localhost:\$PORT"
export ROOT_URL="http://\$ROOT_DOMAIN"

# Our session store uses redis
export REDIS_URL="redis://localhost/3"

# Create a GitHub application, by visiting
# https://github.com/settings/applications/new and then enter the Client
# ID/Secret below
#
#   Name: GraphileDemo
#   Homepage URL: http://localhost:8349
#   Authorization callback URL: http://localhost:8349/auth/github/callback
#
# Client ID:
export GITHUB_KEY=""
# Client Secret:
export GITHUB_SECRET=""
CONFIG
  echo "Passwords generated and configuration written to .env"

  # To source our .env file from the shell it has to be executable.
  chmod +x .env

  . .env
fi

./postgraphile/utils/reset.sh

# All done
echo "✅ Setup success"
