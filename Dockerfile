FROM alpine:latest

RUN apk update &&\
    apk upgrade &&\
    apk add nodejs npm

# Install app dependencies
ADD . /code
WORKDIR /code

RUN rm -rf node_modules
RUN rm -rf .cache
RUN rm -rf .parcel-cache

RUN npm install
RUN npm run build_docker

EXPOSE 80

CMD [ "npm", "run", "start_docker" ]