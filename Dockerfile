FROM node:alpine
LABEL Author "Charles Stover <commander-banlist-api@charlesstover.com>"
WORKDIR /var/www
COPY package.json package-lock.json ./
RUN npm install
COPY src .
EXPOSE 8081
ENTRYPOINT [ "node", "index.js" ]
