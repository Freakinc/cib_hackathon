FROM node:15

ARG APP_DIR=/usr/src/app
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

COPY package.json ./
RUN npm install

COPY . /usr/src/app

RUN npm run build

EXPOSE 4000

CMD ["npm", "start"]
