server-hasura
=====================

This is a docker package for hasura server.

Status
------------
WIP - It works, but I need to solve how this monorepo works when there is a nested docker package. If we deploy the monorepo as a docker package, this would result in a docker-in-docker inception, which should be avoided.
 
 
# Docs



## Hasura GraphQL Engine on Docker with pgAdmin

This Docker Compose setup runs [Hasura GraphQL Engine](https://github.com/hasura/graphql-engine) along with Postgres and [pgAdmin4](https://www.pgadmin.org/) using `docker-compose`.

### Pre-requisites

- [Docker](https://docs.docker.com/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Usage

Start
- `source ../.env; docker-compose up`

Rebuild and Start
- `source ../.env; docker-compose up --build`

Start as daemon
- `source ../.env; docker-compose up -d`

Run Migrations
- `source ../.env; hasura migrate`



### Important endpoints

- GraphQL endpoint will be `http://localhost:8080/v1alpha1/graphql`
- Hasura Console will be available on `http://localhost:8080/console`
- pgAdmin will be available on `http://localhost:5050`



### PGAdmin

- Navigate to `http://localhost:5050`, login and add a new server with the following parameters:  
  General - Name: Hasura  
  Connection - Host: `hasura`  
  Username: `postgres`  
  Password: leave empty  


### Hasura Console

The CMS web application of Hasura is bundled with Hasura, and can also be launched locally. Always use the local method when making schema changes in order to capture migration files.  

- Private/Local console: `source ../.env; hasura console --admin-secret $SUPERUSER_PASSWORD`
- Public: navigate to `http://localhost:8080/console`


### Connecting to External Postgres

If you want to connect to an external/existing postgres database, replace `HASURA_GRAPHQL_DATABASE_URL` in `docker-compose.yaml` with your database url.

**Note: localhost will resolve to the container ip inside a docker container, not the host ip**
