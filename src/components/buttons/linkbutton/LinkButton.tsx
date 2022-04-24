import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import './LinkButton.css';

const LinkButton: React.FC<{ 
  to: string,
  align?: string,
  startIcon?: React.ReactNode,
  endIcon?: React.ReactNode
}> = ({ children, to, align = null, startIcon = undefined, endIcon = undefined }) => {
  return (
      <Button 
        className={`linkbutton ${(align !== null && align==="bottom") && 'nextbutton'}`}
        variant="contained" 
        onClick={undefined} 
        component={Link} 
        to={to}
        style={{position: (align !== null && align==="bottom") ? 'absolute' : 'relative', fontSize: '20px', margin: '10px'}}
        startIcon={startIcon}
        endIcon={endIcon}
      >
        {children}
      </Button>
  );
}

export default LinkButton;