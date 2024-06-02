import { createBrowserRouter } from 'react-router-dom';
import AuthPage from '../pages/auth-page/AuthPage';
import HomePage from '../pages/home-page/HomePage';
import { Protected } from './protected';
import LayoutHome from '../layout/home/LayoutHome';

export const router = createBrowserRouter([
  {
    path: 'signin',
    element: <AuthPage />,
  },
  {
    path: '/',
    element: <Protected />,
    children: [
      {
        path: '/',
        element: <LayoutHome />,
        children: [{ index: true, element: <HomePage /> }],
      },
    ],
  },
]);
