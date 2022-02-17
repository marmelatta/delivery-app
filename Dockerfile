FROM node:16.14.0
WORKDIR /code

COPY package*.json ./
RUN npm install
COPY index.js ./
COPY middleware/ ./middleware/
COPY models/ ./models/
COPY routers/ ./routers/
COPY views/ ./views/

CMD ["npm", "run", "start"]