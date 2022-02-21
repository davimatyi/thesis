import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const LinkButton: React.FC<{ to: string }> = ({ children, to }) => {
  return (
    <Link to={to}>
      <Button onClick={() => null}>{children}</Button>
    </Link>
  );
}

export default LinkButton;