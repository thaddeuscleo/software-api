FROM node:19-alpine3.16

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY . .

# Install app dependencies
RUN npm install --omit=dev
RUN npx prisma generate
RUN npm i -g @nestjs/cli

# Creates a "dist" folder with the production build
RUN npm run build

CMD ["node", "dist/src/main"]
