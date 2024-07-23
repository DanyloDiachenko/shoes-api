FROM node:18
WORKDIR /app
COPY package*.json ./
RUN yarn install --force
COPY . .
ENV PORT=3000
EXPOSE 3000
CMD ["yarn", "start:prod"]
