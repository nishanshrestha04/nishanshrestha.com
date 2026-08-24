import { Html, useProgress } from '@react-three/drei';

const Loader = () => {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="flex flex-col items-center justify-center space-y-3">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-3 border-purple-300 border-opacity-30 "></div>
          <div className="absolute inset-0 border-3 border-pink-400 border-t-transparent animate-spin"></div>
        </div>

        <div className="text-center">
          <p className="text-lg font-medium text-purple-200">
            {Math.round(progress)}%
          </p>
          <p className="text-sm text-text-primary text-opacity-80 mt-1">
            {progress < 50
              ? 'Preparing assets...'
              : progress < 90
                ? 'Almost ready...'
                : 'Finalizing...'}
          </p>
        </div>
      </div>
    </Html>
  );
};

export default Loader;
