FROM node:18-alpine as build-stage
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
WORKDIR /app
COPY package*.json ./
RUN npm install --progress=false
COPY . .
RUN  npm run build

FROM nginx:alpine  as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
#COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
