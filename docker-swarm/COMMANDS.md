# Commands run

- `docker swarm init` - Initializes a swarm and promotes the current node to a manager.
- `docker swarm join --token <token> <manager-ip>:2377` - Joins a node to the swarm as a worker or manager, depending on the token used.
- `docker node ls` - Lists all nodes in the swarm, showing their status and role.
- `docker service create --name <service-name> --replicas <replicas> --publish <port>:<target-port> <image>` - Creates a new service in the swarm using the specified image.
- `docker service ls` - Lists all services running in the swarm.
- `docker service ps <service-name>` - Shows the tasks associated with a specific service, including their status and node assignment.
- `docker service scale <service-name>=<replicas>` - Scales a service to the desired number of replicas.
- `docker service update --image <new-image> <service-name>` - Updates a service to use a new image, triggering a rolling update of the tasks.
- `docker node update --role <manager|worker> <node-id>` - Updates the role of a node in the swarm, promoting or demoting it as needed.
- `docker node rm <node-id>` - Removes a node from the swarm, which can be used to clean up nodes that are no longer needed or have failed.
- `docker swarm leave` - Leaves the swarm, which can be used by worker nodes to exit the swarm or by managers to demote themselves before leaving.
- `docker service rm <service-name>` - Removes a service from the swarm, stopping all associated tasks and cleaning up resources.