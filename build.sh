#!/bin/bash

cd /home/vilem/production-apps/IntrShop-frontend

git pull

docker-compose up -d --build

docker image prune -f
