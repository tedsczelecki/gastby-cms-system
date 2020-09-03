# System Boilerplate

This monolithic repo that is an API and admin area. It uses NodeJS with 
Postgres with GraphQL to power a React UI and a React Native app

## Table of contents

1. Setup
    - [Dev Database](#dev-database)
    - [API](#api)
    - [Admin UI](#admin-ui)

## Dev database

There is a Postgres docker image configured to be used to be used for 
your local development. In production a RDS instance is setup and in use.

To start up the database:

```shell script
cd dev
docker-compose up
```

## API

Most of the apis that run the app are using GraphQl. There are a few 
endpoints that are an exception, mostly because we need endpoints that
accept GET parameters. These endpoints act as proxies to call the GraphQL
API.

To get things running locally

```shell script
cd server
cp .env.sample .env
npm i
npm start
```

The server will start up on port 8000 by default and the GraphQL api
can be accessed from `localhost:8000/graphql`

### .env

- `API_URL` [http://localhost:8000] URL for the api
- `TEST_DATABASE` [secureshift] The local database name. The default is
what is setup through the dev docker image
- `DATABASE_USER` [rebel] The local database username. The default is
what is setup through the dev docker image
- `DATABASE_PASSWORD` [rebel] The local database password. The default is
what is setup through the dev docker image
- `SECRET` [rebelpixel] The JWT secret that is used for user authentiction
- `SENDGRID_API_KEY` Api to send email notifications
- `GOOGLE_API_KEY` Google api with access to the places api

## Admin UI

The UI is built with React, Apollo and React-md. (There is a little bit of 
Redux but its not used much anymore). On startup the UI starts on 
http://localhost:3000

```shell script
cd admin
npm i
npm start
```

You will be redirected to the login.

*Admin User*
- username: ted@rebelpixel.ca
- password: rebelpixel
