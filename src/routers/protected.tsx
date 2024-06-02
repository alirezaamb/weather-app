import { Navigate, Outlet } from 'react-router-dom';
import { getLocalStorage } from '../utils/localStorage';

export const Protected = () => {
  const auth = getLocalStorage('auth');

  if (auth) {
    return <Outlet />;
  } else {
    return <Navigate to="signin" />;
  }
};
