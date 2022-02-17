FROM node:15
RUN mkdir /app
WORKDIR /app
COPY package.json /app
COPY . .
RUN npm install
# RUN npm install nodemon
EXPOSE 4005
CMD ["npm","start"]
