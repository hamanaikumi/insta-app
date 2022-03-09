FROM node:16.0.0

ENV HOST 0.0.0.0

RUN mkdir /app
COPY . /app
WORKDIR /app

EXPOSE 3000

RUN npm install
RUN npm run generate

CMD ["npm", "start"]