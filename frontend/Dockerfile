# client/Dockerfile-dev

# This is the build file for the client module,
# Docker will use this to setup the client container image.

# Installs the node image
FROM node

# Creates the client directory in the container
RUN mkdir -p /app/frontend
# Sets the working directory to the client directory
WORKDIR /app/frontend

# Copies the yarn.lock file to the container
COPY package-lock.json /app/frontend/
# Copies the package.json to the container
COPY package*.json /app/frontend/

# Installs the client dependencies
RUN npm install

# Copies the files from the client directory to the container
COPY . /app/frontend/

# Runs the client
CMD ["npm", "start"]