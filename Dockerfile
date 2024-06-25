FROM node:18-alpine

WORKDIR betalectic-assignment/src

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev" ]