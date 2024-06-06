FROM node:20


WORKDIR /react-vite


COPY react-vite/package*.json ./

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install

COPY react-vite ./

EXPOSE 5173

RUN chmod +x build.sh

CMD ["./build.sh"]