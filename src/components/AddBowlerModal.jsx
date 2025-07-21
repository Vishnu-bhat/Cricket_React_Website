import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddBowlerModal = ({ show, onHide, onAddBowler }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Fast Bowler',
    country: '',
    team: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Bowler name is required';
    }
    
    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }
    
    if (!formData.team.trim()) {
      newErrors.team = 'Team is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onAddBowler(formData);
      
      // Reset form
      setFormData({
        name: '',
        type: 'Fast Bowler',
        country: '',
        team: ''
      });
      setErrors({});
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      type: 'Fast Bowler',
      country: '',
      team: ''
    });
    setErrors({});
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} centered data-bs-theme="dark">
      <Modal.Header closeButton className="bg-dark text-light border-secondary">
        <Modal.Title>
          <i className="bi bi-person-plus me-2"></i>
          Add New Bowler
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="bg-dark text-light">
        <Form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label>
                  <i className="bi bi-person me-2"></i>
                  Bowler Name *
                </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter bowler name"
                  isInvalid={!!errors.name}
                  className="bg-secondary text-light border-secondary"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            
            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label>
                  <i className="bi bi-trophy me-2"></i>
                  Bowler Type
                </Form.Label>
                <Form.Select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="bg-secondary text-light border-secondary"
                >
                  <option value="Fast Bowler">Fast Bowler</option>
                  <option value="Medium Pace">Medium Pace</option>
                  <option value="Spin Bowler">Spin Bowler</option>
                  <option value="Off Spinner">Off Spinner</option>
                  <option value="Leg Spinner">Leg Spinner</option>
                </Form.Select>
              </Form.Group>
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label>
                  <i className="bi bi-flag me-2"></i>
                  Country *
                </Form.Label>
                <Form.Control
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Enter country"
                  isInvalid={!!errors.country}
                  className="bg-secondary text-light border-secondary"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.country}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            
            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label>
                  <i className="bi bi-people me-2"></i>
                  Team *
                </Form.Label>
                <Form.Control
                  type="text"
                  name="team"
                  value={formData.team}
                  onChange={handleInputChange}
                  placeholder="Enter team name"
                  isInvalid={!!errors.team}
                  className="bg-secondary text-light border-secondary"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.team}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </div>

          <div className="text-muted small mb-3">
            <i className="bi bi-info-circle me-1"></i>
            Fields marked with * are required. Biomechanical data can be added later through the analysis tabs.
          </div>
        </Form>
      </Modal.Body>
      
      <Modal.Footer className="bg-dark border-secondary">
        <Button variant="secondary" onClick={handleClose}>
          <i className="bi bi-x-circle me-2"></i>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          <i className="bi bi-check-circle me-2"></i>
          Add Bowler
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddBowlerModal;
