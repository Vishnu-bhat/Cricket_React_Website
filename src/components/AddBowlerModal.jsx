import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

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
    <Modal show={show} onHide={onHide} centered dialogClassName="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>Add New Bowler</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>
              Name
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., Jasprit Bumrah"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>
                  Age
                </Form.Label>
                <Form.Control
                  type="number"
                  min="10"
                  max="60"
                  placeholder="e.g., 30"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>
                  Bowling Type
                </Form.Label>
                <Form.Select
                  value={formData.bowlingType}
                  onChange={(e) => setFormData({...formData, bowlingType: e.target.value})}
                  required
                >
                  <option value="" disabled>Select type...</option>
                  <option value="Fast">Fast</option>
                  <option value="Spin">Spin</option>
                  <option value="Medium">Medium</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" className="btn-secondary-custom" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" className="btn-primary-custom">
            Add Bowler
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddBowlerModal;
