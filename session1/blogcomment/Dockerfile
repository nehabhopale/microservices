FROM node:15
RUN mkdir /app
WORKDIR /app
COPY package.json /app
COPY . .
RUN npm install
EXPOSE 4002
CMD ["npm","start"]
