import CircularProgress from '@mui/material/CircularProgress';

const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <CircularProgress />
      <p className="mt-4 text-lg text-gray-700">Loading...</p>
    </div>
  );
};

export default LoadingPage;
