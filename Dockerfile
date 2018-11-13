FROM node:10.10-alpine

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN yarn install
# RUN npm run seed

EXPOSE 9001

CMD [ "npm", "start" ]