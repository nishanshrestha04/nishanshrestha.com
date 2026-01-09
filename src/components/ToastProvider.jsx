import { Toaster } from 'sonner';

const ToastProvider = () => {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        style: {
          background: '#1f1e39', // color-indigo
          color: 'white',
          border: '1px solid #282b4b', // color-storm
        },
        className: 'font-sans',
      }}
    />
  );
};

export default ToastProvider;
