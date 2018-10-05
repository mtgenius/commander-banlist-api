FROM node:alpine
LABEL Author "Charles Stover <docker@charlesstover.com>"
WORKDIR /var/www
ENV ACCESS_CONTROL_ALLOW_ORIGIN https://mtgeni.us
COPY package.json package-lock.json ./
RUN npm install
COPY src .
EXPOSE 80
ENTRYPOINT [ "node", "index.js" ]
