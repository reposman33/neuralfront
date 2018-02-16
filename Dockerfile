FROM nginx:1.13
COPY /dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
EXPOSE 443

COPY cert/domain-crt.txt /etc/ssl/certs/domain-crt.txt
COPY cert/domain-key.txt /etc/ssl/keys/domain-key.txt

COPY /verify /usr/share/nginx/html/.well-known/acme-challenge
