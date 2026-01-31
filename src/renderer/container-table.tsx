import { useEffect, useState } from "react";

interface DockerPort {
  PrivatePort: number;
  PublicPort?: number;
  Type: string;
}

interface Container {
  id: string;
  name: string;
  image: string;
  status: string;
  state: string;
  ports: DockerPort[];
}

declare global {
  interface Window {
    electronAPI: {
      getContainers: () => Promise<Container[]>;
    };
  }
}

const headers = ['ID', 'Name', 'Image', 'Status', 'State', 'Ports'];

const ContainerTable: React.FC = () => {
  const [containers, setContainers] = useState<Container[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContainers = async () => {
      try {
        const result: Container[] = await window.electronAPI.getContainers();
        setContainers(result);
      } catch (err: any) {
        setError(err.message);
      }
    };

    loadContainers();
  }, []);

  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!containers.length) return <p>No containers found.</p>;

  return (
    <table>
      <thead>
        <tr>
          {headers.map(header => (
            <th key={header} style={{ fontWeight: 'bold' }}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {containers.map(container => (
          <tr key={container.id}>
            <td>{container.id}</td>
            <td>{container.name}</td>
            <td>{container.image}</td>
            <td>{container.status}</td>
            <td>{container.state}</td>
            <td>
              {container.ports.map(
                port =>
                  `${port.PrivatePort}->${port.PublicPort ?? ''}/${port.Type}`
              ).join(', ')}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ContainerTable;
