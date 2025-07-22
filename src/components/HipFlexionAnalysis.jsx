import React, { useState } from 'react';
import { Card, Row, Col, ButtonGroup, Button } from 'react-bootstrap';
import AnalysisChart from './AnalysisChart';

const HipFlexionAnalysis = ({ selectedBowler }) => {
  const [viewMode, setViewMode] = useState('session');

  // Mock data for hip flexion analysis
  const hipData = {
    session: {
      labels: ['Session 1', 'Session 2', 'Session 3', 'Session 4', 'Session 5'],
      data: [65, 72, 68, 75, 70],
      threshold: { min: 60, max: 80 }
    },
    month: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      data: [68, 71, 69, 73, 72, 70],
      threshold: { min: 60, max: 80 }
    },
    year: {
      labels: ['2021', '2022', '2023', '2024'],
      data: [67, 70, 72, 71],
      threshold: { min: 60, max: 80 }
    }
  };

  const currentData = hipData[viewMode];
  const dangerSessions = currentData.data.filter(value => value < currentData.threshold.min || value > currentData.threshold.max).length;

  return (
    <div className="hip-flexion-analysis">
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>Hip Flexion Analysis</h5>
                <ButtonGroup>
                  <Button 
                    variant={viewMode === 'session' ? 'primary' : 'outline-primary'}
                    onClick={() => setViewMode('session')}
                  >
                    Session
                  </Button>
                  <Button 
                    variant={viewMode === 'month' ? 'primary' : 'outline-primary'}
                    onClick={() => setViewMode('month')}
                  >
                    Monthly
                  </Button>
                  <Button 
                    variant={viewMode === 'year' ? 'primary' : 'outline-primary'}
                    onClick={() => setViewMode('year')}
                  >
                    Yearly
                  </Button>
                </ButtonGroup>
              </div>
              
              <Row className="mb-3">
                <Col md={3}>
                  <Card className="bg-success text-white">
                    <Card.Body className="text-center">
                      <h4>{currentData.threshold.min}° - {currentData.threshold.max}°</h4>
                      <small>Safe Range</small>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className="bg-danger text-white">
                    <Card.Body className="text-center">
                      <h4>{dangerSessions}</h4>
                      <small>Danger Sessions</small>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className="bg-info text-white">
                    <Card.Body className="text-center">
                      <h4>{Math.max(...currentData.data)}°</h4>
                      <small>Max Angle</small>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className="bg-warning text-white">
                    <Card.Body className="text-center">
                      <h4>{Math.min(...currentData.data)}°</h4>
                      <small>Min Angle</small>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <AnalysisChart
                title="Hip Flexion Angle Trends"
                data={currentData}
                type="line"
                color="rgba(54, 162, 235, 1)"
                backgroundColor="rgba(54, 162, 235, 0.2)"
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HipFlexionAnalysis;
