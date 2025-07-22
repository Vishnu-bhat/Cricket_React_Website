import React, { useState } from 'react';
import { Card, Row, Col, ButtonGroup, Button } from 'react-bootstrap';
import AnalysisChart from './AnalysisChart';

const KneeAnalysis = ({ selectedBowler }) => {
  const [viewMode, setViewMode] = useState('session');

  // Mock data for knee analysis
  const kneeData = {
    session: {
      labels: ['Session 1', 'Session 2', 'Session 3', 'Session 4', 'Session 5'],
      data: [45, 52, 48, 55, 50],
      threshold: { min: 40, max: 55 }
    },
    month: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      data: [48, 51, 49, 53, 52, 50],
      threshold: { min: 40, max: 55 }
    },
    year: {
      labels: ['2021', '2022', '2023', '2024'],
      data: [47, 50, 52, 51],
      threshold: { min: 40, max: 55 }
    }
  };

  const currentData = kneeData[viewMode];
  const dangerSessions = currentData.data.filter(value => value < currentData.threshold.min || value > currentData.threshold.max).length;

  return (
    <div className="knee-analysis">
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>Knee Analysis</h5>
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
                title="Knee Angle Trends"
                data={currentData}
                type="line"
                color="rgba(255, 99, 132, 1)"
                backgroundColor="rgba(255, 99, 132, 0.2)"
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default KneeAnalysis;
