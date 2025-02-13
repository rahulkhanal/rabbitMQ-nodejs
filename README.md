Find anything from docker hub
# Run the docker image
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:management

# Access the container server
docker exec -it <container_name> bash 