import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { AuthType } from '../../types/type';
import { Alert, Snackbar } from '@mui/material';
import { addNewUser } from '../../api/post/post';
import videoFile from '../../../public/videos/5000083-uhd_3840_2160_30fps.mp4';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp({ setSearchParams }: AuthType) {
  const [toastState, setToastState] = React.useState({
    isOpen: false,
    message: 'Requierd fields must be filled',
  });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('email') !== '' && data.get('password') !== '') {
      const newData = {
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        email: data.get('email'),
        password: data.get('password'),
        id: Date.now(),
      };
      event.currentTarget.reset();
      await addNewUser(newData);
      setToastState({
        isOpen: true,
        message: 'Signed Up succesfully',
      });
    } else {
      setToastState({
        isOpen: true,
        message: 'Requierd fields must be filled',
      });
    }
  };

  const handleSignInClick = () => {
    setSearchParams({
      action: 'signin',
    });
  };
  const handleClose = () => {
    setToastState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />

        <Grid item xs={12} sm={9} md={7} component={Paper} elevation={6}>
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              px: 4,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    <Box onClick={handleSignInClick}>
                      Already have an account? Sign in
                    </Box>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={false} sm={3} md={5}>
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
        <Snackbar
          autoHideDuration={2000}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          open={toastState.isOpen}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="info"
            variant="filled"
            sx={{ width: '100%' }}
          >
            {toastState.message}
          </Alert>
        </Snackbar>
      </Grid>
    </ThemeProvider>
  );
}
