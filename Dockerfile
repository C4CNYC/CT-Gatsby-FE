FROM node:lts as builder

ARG API_URL
ENV API_URL=${API_URL}

ADD package.json package-lock.json ./
#RUN npm install --only=production
RUN npm install
ADD . .
RUN npm run-script build

FROM nginx:alpine
COPY .docker/nginx.default.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
COPY --from=builder /build .

EXPOSE 80
