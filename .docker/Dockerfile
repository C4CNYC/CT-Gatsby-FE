FROM node:lts as builder

ARG API_URL
ENV API_URL=${API_URL}

WORKDIR /usr/src
ADD package.json package-lock.json ./
#RUN npm install --only=production
RUN npm install
COPY . .
RUN npm run-script build

FROM nginx:1.14

# Remove default configuration
RUN rm /etc/nginx/conf.d/default.conf

COPY .docker/nginx.conf /etc/nginx/nginx.conf
COPY .docker/project.conf /etc/nginx/conf.d/project.conf
COPY .docker/map_ua.conf /etc/nginx/conf.d/map_ua.conf

COPY --from=builder /usr/src/public /var/www/dist
