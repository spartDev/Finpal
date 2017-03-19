FROM node:7.7.1

WORKDIR /opt/app

COPY package.json npm-shrinkwrap.json ./

RUN npm install --production

ENV NODE_ENV=production

COPY . .

RUN npm run build

CMD [ "npm", "start" ]
