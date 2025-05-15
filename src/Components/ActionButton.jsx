import React from 'react';
import { Button } from 'react-bootstrap';

const ActionButton = ({ label, onClick, variant = 'primary' }) => {
  return (
    <Button variant={variant} onClick={onClick}>
      {label}
    </Button>
  );
};

export default ActionButton;