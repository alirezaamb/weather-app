import { createBrowserRouter } from 'react-router-dom';
import { Protected } from './protected';
import LayoutHome from '../layout/home/LayoutHome';
import { Suspense, lazy } from 'react';
import LoadingPage from '../components/home/shared/loading/Loading';
const AuthPage = lazy(() => import('../pages/auth-page/AuthPage'));
const HomePage = lazy(() => import('../pages/home-page/HomePage'));

export const router = createBrowserRouter([
  {
    path: 'signin',
    element: (
      <Suspense fallback={<LoadingPage />}>
        <AuthPage />
      </Suspense>
    ),
  },
  {
    path: '/',
    element: <Protected />,
    children: [
      {
        path: '/',
        element: <LayoutHome />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<LoadingPage />}>
                <HomePage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);
