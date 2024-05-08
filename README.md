# Nutritionist-gpt Service

## Setup

Recommendation is to run everything through the docker container

1. Run `npm i`
2. Create .env by running `cp .env.sample .env` command
3. Set OpenAi api key in .env
4. Run `docker-compose build` and `docker-compose up`
5. Access service through port `4000`,
   db through `5432`,

Migrations should run on on first service launch

## Usage

All endpoints can be accessed on Swagger at 
`http://localhost:4000/api/docs`

1. Create User, using `api/v1/users`
2. Login, using `api/v1/logic` (Tokens are valid for 12h, unless set otherwise)
3. From login response, copy access token and paste it into `Authorize` section at the top right.
(Note: Don't need to add `Bearer` prefix when authorizing token, just copy + paste it directly from response)
4. Should be able to use the bot at `api/chat`