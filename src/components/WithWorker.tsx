import { FC, useEffect, useRef, useState } from 'react';
import { getRandomColor } from '../lib/getRandomColor';

const WithWorker: FC = () => {
  const [number, setNumber] = useState(0);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    const newColor = getRandomColor();
    containerRef.current?.style.setProperty('background-color', newColor);
  };

  useEffect(() => {
    const worker = new Worker(new URL('worker.ts', import.meta.url));

    worker.postMessage('bigNumber');
    setLoading(true);

    worker.onmessage = (e) => {
      console.log(e.data, 'e.data');
      const { type, data } = e.data;
      if (type === 'bigNumber') setNumber(data);
      setLoading(false);
    };

    return () => {
      worker.terminate();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`h-48 w-96 rounded-xl shadow-md flex items-center justify-center flex-col text-center`}
    >
      <h1>Hey I'm a worker but I'm not using a worker!!!</h1>
      <h1 className="text-2xl font-bold">
        My count is:{' '}
        {loading ? (
          <span className="text-base italic animate-pulse duration-300">
            calculating
          </span>
        ) : (
          number
        )}
      </h1>

      <button
        className="p-2 mt-6 text-left border w-2/3 rounded-xl hover:text-blue-600 focus:text-blue-600 border-gray-300"
        onClick={handleClick}
      >
        <h3 className="text-xl font-bold text-center">Change Color &rarr;</h3>
      </button>
    </div>
  );
};

export default WithWorker;
