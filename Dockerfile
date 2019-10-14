FROM node:alpine
LABEL Author "Charles Stover <docker@charlesstover.com>"
WORKDIR /var/www
ENV ACCESS_CONTROL_ALLOW_ORIGIN https://mtgeni.us https://mtgenius.github.io
COPY package.json package-lock.json ./
RUN npm install
COPY src .
EXPOSE 8081
ENTRYPOINT [ "node", "index.js" ]
