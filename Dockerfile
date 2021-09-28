#build environment
FROM mhart/alpine-node:14.15.0 as build
WORKDIR /fe
COPY ./fe/ ./
RUN npm install --no-fund --silent
RUN npm run build
RUN npm run gzip

#production environment
FROM nginx:stable-alpine
COPY --from=build /fe/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]