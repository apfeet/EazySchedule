FROM node:20-alpine
COPY . .
WORKDIR /react-vite
RUN rm -rf node_modules package-lock.json
RUN npm install
CMD ["npm", "run", "dev"]