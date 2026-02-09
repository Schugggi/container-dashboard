import { createRoot } from 'react-dom/client';
import ContainerTable from './container-table';
import { useState } from 'react';
import { ContainerTableVariant } from '../models/containerTableVariants';

const rootElement = document.getElementById('root');

const App: React.FC = () => {
  const [tableVariant, setTableVariant] =
    useState<ContainerTableVariant>('default');

  return (
    <div className='grid grid-cols-2 grid-rows-2 gap-1 p-6'>
      <div className="">
        <h3 className="text-lg font-semibold ml-3 text-slate-800">Container Dashboard</h3>
        <p className="text-slate-500 mb-5 ml-3">Das Container Dashbaord wurde im Projekt IPRO entwickelt und bietet eine Übersicht über die lokalen Docker Container</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold ml-3 text-slate-800">Themes</h3>
        <div className="flex gap-2 mt-2 ml-3">
          {(['default', 'compact', 'spacious', 'elevated', 'dark', 'animated'] as ContainerTableVariant[]).map(
            variant => (
              <button
                key={variant}
                onClick={() => setTableVariant(variant)}
                className={`
                  px-3 py-1.5 rounded-md text-sm font-medium transition
                  ${
                    tableVariant === variant
                      ? 'bg-slate-800 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }
                `}
              >
                {variant.charAt(0).toUpperCase() + variant.slice(1)}
              </button>
            )
          )}
        </div>
      </div>
      <div className='col-span-2'>
        <ContainerTable variant={tableVariant} />
      </div>
    </div>
  );
};

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
} else {
  console.error('Root element not found. Ensure your HTML has: <div id="root"></div>');
}