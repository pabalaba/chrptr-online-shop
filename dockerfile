FROM node:16

WORKDIR /game/Desktop/chrptr-online-shop

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4444

CMD ["npm","start"]