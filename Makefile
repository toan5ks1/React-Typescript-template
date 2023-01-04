.EXPORT_ALL_VARIABLES:

COMPOSE_PROJECT_NAME=manabie-online-fe

BUILD_IMAGE_NAME=asia.gcr.io/student-coach-e1e95/school-portal-admin
BUILD_PORT=8080
NAME=deploy-web-backoffice-firebase


all: build-docker

build-node-images:
	DOCKER_BUILDKIT=1 docker build -f ./deployments/node.Dockerfile -t asia.gcr.io/student-coach-e1e95/backoffice_node:14.18-alpine3.12 .

docker-build-web-nginx: build-node-images
	docker build -f ./deployments/nginx.Dockerfile --build-arg GITHUB_TOKEN=${GITHUB_TOKEN} --build-arg VITE_PJ_OWNER=${ORGANIZATION} --build-arg VITE_ENV=${ENVIRONMENT} --build-arg FE_TAG=${FE_TAG} -t ${IMAGE_TAG} .

deploy-web-backoffice-firebase:
	docker run --name ${NAME} ${IMAGE_TAG} /bin/sh -c "echo run"
	docker cp ${NAME}:/usr/share/nginx/html/. ./build/
	yarn firebase-deploy:${ORGANIZATION}:${ENVIRONMENT}

deploy-release:
	docker run --rm -it -p ${BUILD_PORT}:80 ${BUILD_IMAGE_NAME}:$(shell git rev-parse --short HEAD)
