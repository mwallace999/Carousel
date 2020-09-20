FROM node:12.7.0-alpine
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .
CMD ["node", "server/server.js"]
EXPOSE 8001