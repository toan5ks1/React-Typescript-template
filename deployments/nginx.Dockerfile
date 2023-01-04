FROM asia.gcr.io/student-coach-e1e95/backoffice_node:14.18-alpine3.12 AS builder

ARG GITHUB_TOKEN
RUN git config --global --add url."https://${GITHUB_TOKEN}:x-oauth-basic@github.com/manabie-com".insteadOf "https://github.com/manabie-com"

WORKDIR /app

COPY .npmrc /app/
COPY package.json /app/
COPY yarn.lock /app/

RUN yarn install
COPY . .

ARG FE_TAG
ENV FE_TAG $FE_TAG

ARG VITE_ENV=staging
ARG VITE_PJ_OWNER=manabie
RUN echo "./environments/.env.${VITE_PJ_OWNER}.${VITE_ENV}"

RUN yarn env-cmd -f ./environments/.env.${VITE_PJ_OWNER}.${VITE_ENV} yarn build

FROM nginx:1.21.3-alpine

COPY ./deployments/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build/ /usr/share/nginx/html
