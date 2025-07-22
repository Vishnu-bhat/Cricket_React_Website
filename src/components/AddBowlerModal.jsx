import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddBowlerModal = ({ show, onHide, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    matches: '',
    average: '',
    image: 'https://via.placeholder.com/50'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ name: '', matches: '', average: '', image: 'https://via.placeholder.com/50' });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Bowler</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Matches Played</Form.Label>
            <Form.Control
              type="number"
              value={formData.matches}
              onChange={(e) => setFormData({...formData, matches: parseInt(e.target.value)})}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Average</Form.Label>
            <Form.Control
              type="number"
              step="0.1"
              value={formData.average}
              onChange={(e) => setFormData({...formData, average: parseFloat(e.target.value)})}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Add Bowler
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddBowlerModal;
