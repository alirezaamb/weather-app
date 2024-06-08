import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthType } from '../../types/type';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../../api/get/get';
import { Alert, Snackbar } from '@mui/material';
import { setLocalStorage } from '../../utils/localStorage';
import videoFile from '/videos/authPagemp4.mp4';

const defaultTheme = createTheme();

export default function SignIn({ setSearchParams }: AuthType) {
  const [toastState, setToastState] = React.useState({
    isOpen: false,
    message: 'UserName or Password is incorrect',
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const data = new FormData(event.currentTarget);
    const userInfo = {
      email: data.get('email'),
      password: data.get('password'),
    };

    const allUsers = await getAllUsers();
    const foundedUser = allUsers.find(
      (user: { email: FormDataEntryValue | null }) => {
        return user.email === userInfo.email;
      }
    );
    if (!foundedUser || foundedUser.password !== userInfo.password) {
      setIsLoading(false);
      setToastState({
        isOpen: true,
        message: 'Username or Password is incorrect',
      });
    } else {
      navigate('/');
      setLocalStorage(
        'auth',
        JSON.stringify({ isLogin: true, name: foundedUser.firstName })
      );
    }
  };

  const handleSignUpClick = () => {
    setSearchParams({
      action: 'signup',
    });
  };

  const handleClose = () => {
    setToastState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7}>
          <video
            autoPlay
            loop
            muted
            style={{
              position: 'fixed',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: -1,
            }}
          >
            <source src={videoFile} type="video/mp4" />
          </video>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
              >
                {isLoading ? 'signing in...' : ' Sign In'}
              </Button>

              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Link href="#" variant="body2">
                  <Box onClick={handleSignUpClick}>
                    "Don't have an account? Sign Up"
                  </Box>
                </Link>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={toastState.isOpen}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {toastState.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
