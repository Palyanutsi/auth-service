FROM node:18

WORKDIR /src

COPY .yarn ./.yarn/
COPY .yarnrc.yml ./
COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

# RUN yarn migrate:create

CMD [ "yarn", "start:dev" ]
