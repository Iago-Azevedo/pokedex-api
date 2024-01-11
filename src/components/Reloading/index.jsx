import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Reloading() {
  return (
    <Box sx={{ display: 'flex', justifyContent:'center', alignItems:'center' }} width="100%" height="100vh" >
      <CircularProgress style={{width:"70px", height:"70px"}}/>
    </Box>
  );
}
