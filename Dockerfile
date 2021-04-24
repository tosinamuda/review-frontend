# Stage 1

FROM node:10-alpine as build-step

RUN mkdir -p /FRONTEND

WORKDIR /FRONTEND 

COPY package.json /FRONTEND 

RUN npm install

COPY . /FRONTEND 

RUN npm run  build --prod
#RUN ls /FRONTEND/dist/review-system  

# Stage 2

FROM nginx:1.17.1-alpine

COPY --from=build-step /FRONTEND/dist/review-system  /usr/share/nginx/html

