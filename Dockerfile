FROM node:latest
MAINTAINER KuTuGu "zhongliwang48@gmail.com"

# Set web path
ENV WEB_PATH /var/www
ENV CLIENT_PATH http2/page/

# Copy files
WORKDIR $WEB_PATH/my_server
COPY . .

# Server and Client
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org \
    && cnpm install \
    && cd $CLIENT_PATH \
    && cnpm install \
    && npm run build \
    && useradd -c "Create for running web service." www \
    && chown -R www:www $WEB_PATH

USER www:www
# Http
EXPOSE 8080
# Https
EXPOSE 8081
CMD [ "npm", "start" ]