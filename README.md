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

# Security

Warning: You need to setup security yourself, read more [here](https://www.prisma.io/docs/prisma-server/authentication-and-security-kke4/)
