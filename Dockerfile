################################################################################
##                                 BASE IMAGE                                 ##
################################################################################

# Use node image based on Debian 10 (Buster) from DockerHub as base
FROM node:15.13.0-buster-slim AS base

# Upgrade npm to latest version
RUN npm install --no-update-notifier --quiet -g npm

# Supress npm funding message
RUN npm config -g set fund false

# Change default UID/GID of node user/group
# This allows using 1000 as UID/GID for the API
# https://github.com/nodejs/docker-node/issues/289
RUN groupmod -g 1729 node \
  && usermod -u 1729 -g 1729 node

# Set build arguments for non-root user
ARG USER_ID=1000
ARG GROUP_ID=1000

# Set general environment variables
ENV API_DIR="/usr/src/api" \
    API_GROUP="api" \
    API_USER="api"

# Set default work directory
WORKDIR ${API_DIR}

# Create non-root user and give it appropriate permissions
RUN groupadd -g ${GROUP_ID} ${API_GROUP} \
  && useradd -m -s /bin/bash -u ${USER_ID} -g ${API_GROUP} ${API_USER} \
  && chown ${USER_ID}:${GROUP_ID} ${API_DIR}

# Copy Debian Buster packages
COPY apt-packages.txt .

# Install Apt dependencies
RUN apt-get update -y -qq && xargs -ra apt-packages.txt apt-get install -y -qq

# Run commands as non-root user
USER ${API_USER}:${API_GROUP}

# Set API port
ENV API_PORT=3000

# Expose API port
EXPOSE ${API_PORT}

################################################################################
##                              DEVELOPMENT IMAGE                             ##
################################################################################

# Create development image from base
FROM base AS development

# Copy NPM packages
COPY --chown=${API_USER}:${API_GROUP} package*.json ./

# Install Node dependencies
RUN npm install --quiet

# Copy remaining API code
COPY --chown=${API_USER}:${API_GROUP} . .

# Set development environment variables
ENV NODE_ENV=development

# Run the API in development mode
CMD ["npm", "run", "start:dev"]

################################################################################
##                              PRODUCTION IMAGE                              ##
################################################################################

# Create production image from base
FROM development AS production

# Remove all development dependencies
RUN npm prune --production

# Set production environment variables
ENV NODE_ENV=production

# Run the API in production mode
CMD ["npm", "run", "start:prod"]
