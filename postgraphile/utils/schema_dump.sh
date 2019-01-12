#!/bin/bash
set -e
SCRIPTS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
OUT_DIR=${SCRIPTS_DIR}/../__generated__

echo "Exporting GraphQL schema to __generated__/"

# There's no easy way to exclude postgraphile_watch from the dump, so we drop and and restore it at the end
echo "DROP SCHEMA IF EXISTS postgraphile_watch CASCADE;" | psql -X1 -v ON_ERROR_STOP=1 graphiledemo

# Here we do a schema only dump of the graphiledemo DB to the data folder
pg_dump -s -O -f ${OUT_DIR}/schema.sql graphiledemo

# Restore the watch schema
cat ${SCRIPTS_DIR}/../../server-koa2/node_modules/graphile-build-pg/res/watch-fixtures.sql | psql -X1 -v ON_ERROR_STOP=1 graphiledemo

postgraphile -X --export-schema-graphql ${OUT_DIR}/schema.graphql --export-schema-json ${OUT_DIR}/schema.json
