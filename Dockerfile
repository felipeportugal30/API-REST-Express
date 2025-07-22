FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache netcat-openbsd

COPY package*.json ./
RUN npm install --production

COPY . .

COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

EXPOSE 3000

CMD ["./entrypoint.sh"]
