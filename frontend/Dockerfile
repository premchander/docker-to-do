# Step1 for build

FROM node:14 AS builder

WORKDIR /app

COPY to-do-app/package*.json ./

RUN npm install

COPY to-do-app .

RUN npm run build



# Step 2 for packaging in nginx

FROM nginx:1.21.0-alpine

COPY --from=builder /app/dist/to-do-app /usr/share/nginx/html

EXPOSE 80


