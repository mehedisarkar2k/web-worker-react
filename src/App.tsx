import { FC, useState } from 'react';
import WithWorker from './components/WithWorker';
import WithoutWorker from './components/WithoutWorker';

const App: FC = () => {
  const [state, setState] = useState<'worker' | 'withoutWorker'>('worker');

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col items-center space-x-4 justify-start min-h-screen py-2">
        <div className="flex items-center justify-center space-x-4">
          <button
            className={`p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600 ${
              state === 'worker'
                ? 'border-blue-600 text-blue-600'
                : 'border-gray-300'
            }`}
            onClick={() => setState('worker')}
          >
            <h3 className="text-2xl font-bold">With Web Worker &rarr;</h3>
          </button>

          <button
            className={`p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600 ${
              state === 'withoutWorker'
                ? 'border-blue-600 text-blue-600'
                : 'border-gray-300'
            }`}
            onClick={() => setState('withoutWorker')}
          >
            <h3 className="text-2xl font-bold">Without Web Worker &rarr;</h3>
            <p>
              This will freeze your browser until the big number is calculated
            </p>
          </button>
        </div>

        {/* horizontal row */}
        <div className="flex items-center justify-center w-full my-6">
          <div className="w-full h-0.5 bg-gray-300"></div>
        </div>

        <div className="h-full">
          {state === 'worker' && <WithWorker />}
          {state === 'withoutWorker' && <WithoutWorker />}
        </div>
      </div>
    </div>
  );
};

export default App;
