import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddBowlerModal = ({ show, onHide, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    bowlingType: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ name: '', age: '', bowlingType: '' });
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
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              min="10"
              max="60"
              value={formData.age}
              onChange={(e) => setFormData({...formData, age: e.target.value})}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Bowling Type</Form.Label>
            <Form.Select
              value={formData.bowlingType}
              onChange={(e) => setFormData({...formData, bowlingType: e.target.value})}
              required
            >
              <option value="">Select type</option>
              <option value="Fast">Fast</option>
              <option value="Spin">Spin</option>
              <option value="Medium">Medium</option>
              <option value="Other">Other</option>
            </Form.Select>
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
