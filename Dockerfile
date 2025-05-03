FROM node:18 as build
WORKDIR /etc/compositly
ENV PATH /etc/compositly/node_modules/.bin:$PATH
COPY package*.json ./
COPY . .
RUN cd /etc/compositly
RUN npm i
RUN npm run build
# production environment
FROM nginx:stable-alpine
COPY --from=build /etc/compositly/dist /usr/share/nginx/html
# Add your nginx.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
EXPOSE 443
EXPOSE 9538
CMD ["nginx", "-g", "daemon off;"]