import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import './LinkButton.css';

const LinkButton: React.FC<{ to: string }> = ({ children, to }) => {
  return (
    <Link to={to}>
      <Button onClick={undefined}>{children}</Button>
    </Link>
  );
}

export default LinkButton;