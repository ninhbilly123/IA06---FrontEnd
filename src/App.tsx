// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
import { AppBar, Toolbar, Button, Container, Box } from '@mui/material';

const App = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
          <Button color="inherit" component={Link} to="/login">Login</Button>
        </Toolbar>
      </AppBar>
      <Box display="flex" justifyContent="center" alignItems="flex-start" sx={{ mt: 3 }}>
        <Container maxWidth="sm">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
};

export default App;
