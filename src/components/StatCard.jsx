import React from 'react';
import { Card } from 'react-bootstrap';

const StatCard = ({ value, label, bg = 'light', text = 'dark', className = '' }) => (
  <Card className={`bg-${bg} text-${text} text-center ${className}`}>
    <Card.Body>
      <h4>{value}</h4>
      <small>{label}</small>
    </Card.Body>
  </Card>
);

export default StatCard;
