import { useEffect, useState } from "react";
import { ContainerTableVariant, containerTableVariants } from "../models/containerTableVariants";

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

type ContainerTableProps = {
  variant?: ContainerTableVariant;
};

const headers = ['ID', 'Name', 'Image', 'Status', 'State', 'Ports'];

const ContainerTable: React.FC<ContainerTableProps> = ({ variant = 'default' }) => {
  const styles = containerTableVariants[variant];

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
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map(header => (
              <th
                key={header}
                className={styles.th}
                style={{ fontWeight: 'bold' }}
              >
                <p className={styles.thText}>{header}</p>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {containers.map(container => (
            <tr key={container.id} className={styles.tr}>
              <td className={styles.td}>{container.id}</td>
              <td className={styles.td}>{container.name}</td>
              <td className={styles.td}>{container.image}</td>
              <td className={styles.td}>{container.status}</td>
              <td className={styles.td}>{container.state}</td>
              <td className={styles.td}>
                {container.ports
                  .map(
                    port =>
                      `${port.PrivatePort}->${port.PublicPort ?? ''}/${port.Type}`
                  )
                  .join(', ')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>);
};

export default ContainerTable;
