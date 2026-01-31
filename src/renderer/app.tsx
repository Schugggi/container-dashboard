import { createRoot } from 'react-dom/client';
import ContainerTable from './container-table';

const rootElement = document.getElementById('root');

const App: React.FC = () => (
  <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
    <h2>Docker Containers</h2>
    <ContainerTable />
  </div>
);

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
} else {
  console.error('Root element not found. Ensure your HTML has: <div id="root"></div>');
}