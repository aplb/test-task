#!/usr/bin/env bash
cd client && yarn && cd - && npm run build &&
docker-compose up --build -d