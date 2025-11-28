import { Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Stack spacing={2} alignItems="flex-start">
      <Typography variant="h4">Welcome</Typography>
      <Typography>Choose an action:</Typography>
      <Stack direction="row" spacing={2}>
        <Button component={Link} to="/signup" variant="contained">Sign Up</Button>
        <Button component={Link} to="/login" variant="outlined">Login</Button>
      </Stack>
    </Stack>
  );
};

export default Home;
