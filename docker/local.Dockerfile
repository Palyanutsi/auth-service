FROM node:18

WORKDIR /src

COPY .yarn ./.yarn/
COPY .yarnrc.yml ./
COPY package.json ./
COPY yarn.lock ./

RUN yarn install
RUN yarn migrate:create

COPY . .

CMD [ "yarn", "start:dev" ]
