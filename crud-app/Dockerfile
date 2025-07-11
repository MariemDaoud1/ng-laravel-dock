FROM node:22.13.1 AS angular

WORKDIR /app

COPY . .
RUN npm install
RUN npm run build

FROM httpd:2.4 
RUN rm -rf /usr/local/apache2/htdocs/*
COPY --from=angular /app/dist/crud-app/ /usr/local/apache2/htdocs/
#COPY httpd.conf /usr/local/apache2/conf/httpd.conf
Expose 80
CMD ["httpd-foreground"]    