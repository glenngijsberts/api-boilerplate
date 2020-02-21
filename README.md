# api-boilerplate

Boilerplate to get started with Prisma and GraphQL Yoga

# Getting started

Make sure to install [Docker](https://docs.docker.com/install/). Verify that you have Docker compose installed by running `docker-compose -v`. Duplicate the `.env-example` file and call it `.env`. Assign values to `PRISMA_SECRET`, `JWT_SECRET` and `NODE_ENV`. Example:

```
PRISMA_ENDPOINT="http://localhost:4466"
APP_URL="http://localhost:3000"
PRISMA_SECRET="25;+>}Vec-bE]AA"
JWT_SECRET="_@26geo6fff48be"
NODE_ENV="dev"
```

```bash
# install prisma
npm install -g prisma

# install depedencies
yarn || npm install

# run prisma server with docker
docker-compose up -d

# deploy your first schema
yarn deploy || npm run deploy

# start yoga server
yarn dev || npm run dev
```

This will start the GraphQL Yoga server at `:4000`. This will open the GraphQL Playground where you can check out the docs and schema.

# Admin

Check out the database/admin at `:4466/_admin`. You can generate a token with `prisma token`. You can inspect the Prisma server at `:4466`.

# Security

Warning: You need to setup security yourself, read more [here](https://www.prisma.io/docs/prisma-server/authentication-and-security-kke4/)

# How does it work?

Prisma and MySQL are running in Docker containers. The GraphQL Yoga server is running on top of the Prisma server, that serves as an ORM for the Yoga server. You will most likely make contact with the Yoga server at port `:4000`.
