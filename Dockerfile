FROM node:lts as builder

ARG API_URL
ENV API_URL=${API_URL}

#ADD package.json yarn.lock ./
ADD package.json ./
#RUN npm install --only=production
RUN yarn install
ADD . .
RUN yarn run build

FROM nginx:alpine
COPY .docker/nginx.default.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
COPY --from=builder /build .

EXPOSE 80
