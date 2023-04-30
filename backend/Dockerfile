FROM node:latest
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3001
ENTRYPOINT ["node", "index.js"]
# docker build -t cholkerajaykumar/simplyonline:backend .
# sudo docker run -it --add-host host.docker.internal:host-gateway -p 3001:3001 cholkerajaykumar/simplyonline:backend