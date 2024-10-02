#!/bin/bash

export JWT_SECRET=$(openssl rand -base64 32)

echo "Generated JWT_SECRET: $JWT_SECRET"

exec node src/index.js