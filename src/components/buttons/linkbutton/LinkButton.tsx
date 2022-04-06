import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import './LinkButton.css';

const LinkButton: React.FC<{ to: string }> = ({ children, to }) => {
  return (
      <Button 
        className="linkbutton" 
        variant="contained" 
        onClick={undefined} 
        component={Link} 
        to={to}
      >
        {children}
      </Button>
  );
}

export default LinkButton;