import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

function Header() {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'purple' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          FoodBook 
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
