FROM nginx:latest

RUN mkdir -p /var/lib/nginx/tmp
RUN chmod -R 755 /usr/share/nginx/html
RUN chown -R nginx:nginx /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf
