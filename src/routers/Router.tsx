import { createBrowserRouter } from 'react-router-dom';
import AuthPage from '../pages/auth-page/AuthPage';

export const router = createBrowserRouter([
  {
    path: 'signin',
    element: <AuthPage />,
  },
]);
