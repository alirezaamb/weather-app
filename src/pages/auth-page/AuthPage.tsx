import SignIn from '../../components/sign-in/SignIn';
import { useSearchParams } from 'react-router-dom';
import SignUp from '../../components/sign-up/SignUp';

const AuthPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const action = searchParams.get('action');
  return action === 'signup' ? (
    <SignUp setSearchParams={setSearchParams} />
  ) : (
    <SignIn setSearchParams={setSearchParams} />
  );
};

export default AuthPage;
