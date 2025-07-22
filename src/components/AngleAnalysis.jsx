import { useState } from 'react';
import { Card, Row, Col, ButtonGroup, Button } from 'react-bootstrap';
import AnalysisChart from './AnalysisChart';

const AngleAnalysis = ({
  title,
  dataSets,
  chartTitle,
  safeLabel = 'Safe Range',
  dangerLabel = 'Danger Sessions',
  maxLabel = 'Max Angle',
  minLabel = 'Min Angle',
}) => {
  const [viewMode, setViewMode] = useState('session');
  const currentData = dataSets[viewMode];
  
  // Combine data from all datasets for summary calculations
  const allDataPoints = currentData.datasets.flatMap(ds => ds.data);

  const dangerSessions = allDataPoints.filter(
    value => value < currentData.threshold.min || value > currentData.threshold.max
  ).length;

  return (
    <div className="angle-analysis">
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>{title}</h5>
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
                      <small>{safeLabel}</small>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className="bg-danger text-white">
                    <Card.Body className="text-center">
                      <h4>{dangerSessions}</h4>
                      <small>{dangerLabel}</small>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className="bg-info text-white">
                    <Card.Body className="text-center">
                      <h4>{Math.max(...allDataPoints)}°</h4>
                      <small>{maxLabel}</small>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className="bg-warning text-white">
                    <Card.Body className="text-center">
                      <h4>{Math.min(...allDataPoints)}°</h4>
                      <small>{minLabel}</small>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <AnalysisChart
                title={chartTitle}
                data={currentData}
                type="line"
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AngleAnalysis;