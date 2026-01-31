import Docker, { ContainerInfo } from 'dockerode';

const docker = new Docker({ socketPath: '/var/run/docker.sock' });

interface ContainerDetails {
  id: string;
  name: string;
  image: string;
  status: string;
  state: string;
  ports: ContainerInfo['Ports'];
}

export const listDockerContainers = async (): Promise<ContainerDetails[]> => {
  try {
    const containers = await docker.listContainers({ all: true });
    console.log(`container count: ${containers.length}`);

    const containerInfo: ContainerDetails[] = containers.map(container => ({
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
