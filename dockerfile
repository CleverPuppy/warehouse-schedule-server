FROM node:latest
COPY ./package.json /app/
WORKDIR /app/
RUN npm install

EXPOSE 8000
ENTRYPOINT ["node","/app/build/app.js"]