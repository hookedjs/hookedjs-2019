#!/bin/bash
set -e
export NODE_ENV=development
SCRIPTS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

psql -X1v ON_ERROR_STOP=1 graphiledemo -f ${SCRIPTS_DIR}/../__generated__/schema.sql
