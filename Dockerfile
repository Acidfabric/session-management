# syntax=docker/dockerfile:1

# Build Stage 1
# This build created a staging docker image
#
FROM node:16.13-alpine AS appbuild

WORKDIR /app
COPY package.json package-lock.json* ./

RUN npm install
COPY ./ ./
RUN npm run build

# Build Stage 2
# This build takes the production build from staging build
#
FROM node:16.13-alpine
ENV NODE_ENV=production

WORKDIR /app
COPY package.json package-lock.json* ./
COPY ./prisma ./

RUN npm install

COPY --from=appbuild /app/build ./build
RUN npm run prisma:generate

EXPOSE 4002
CMD npm start