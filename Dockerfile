FROM node:20-alpine

# Create app directory
WORKDIR /

# Install app dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Build
RUN npm run build

# Start
CMD [ "npm", "start" ]