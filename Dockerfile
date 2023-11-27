FROM node:14-alpine AS development
ENV NODE_ENV development
# Add a work directory
WORKDIR /test-90poe
# Cache and Install dependencies
COPY package.json .

RUN npm install
RUN npm test

# Copy app files
COPY . .
# Expose port
EXPOSE 3000
# Start the app

CMD [ "npm", "start" ]