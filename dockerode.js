var Docker = require('dockerode');
var docker = new Docker({ socketPath: '/var/run/docker.sock' });

const listDockerContainers = async () => {
    try {
        const containers = await docker.listContainers({ all: true });
        console.log('container count: ' + containers.length);
        
        const containerInfo = containers.map(container => ({
            id: container.Id.substring(0, 12),
            name: container.Names[0],
            image: container.Image,
            status: container.Status,
            state: container.State,
            ports: container.Ports
        }));
        
        return containerInfo;
    } catch (err) {
        console.error('Error listing containers:', err);
        throw err;
    }
};

module.exports = { listDockerContainers };