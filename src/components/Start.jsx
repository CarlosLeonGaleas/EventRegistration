import { useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';

function Start({ setSubtitle }) {
  useEffect(() => {
    setSubtitle('');
  }, [setSubtitle]);

  return (
    <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
      <Paper sx={{ p: 4, maxWidth: 800 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Bienvenido
        </Typography>
        <Typography variant="body1" paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse 
          cillum dolore eu fugiat nulla pariatur.
        </Typography>
        <Typography variant="body1">
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
          deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste 
          natus error sit voluptatem accusantium doloremque laudantium.
        </Typography>
      </Paper>
    </Box>
  );
}

export default Start;