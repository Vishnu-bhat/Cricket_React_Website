import { useState } from 'react';
import { Card, Row, Col, ButtonGroup, Button } from 'react-bootstrap';
import AnalysisChart from './AnalysisChart';
import StatCard from './StatCard'; // Import the StatCard component

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
                  <StatCard
                    value={`${currentData.threshold.min}° - ${currentData.threshold.max}°`}
                    label={safeLabel}
                    bg="success"
                    text="white"
                  />
                </Col>
                <Col md={3}>
                  <StatCard
                    value={dangerSessions}
                    label={dangerLabel}
                    bg="danger"
                    text="white"
                  />
                </Col>
                <Col md={3}>
                  <StatCard
                    value={`${Math.max(...allDataPoints)}°`}
                    label={maxLabel}
                    bg="info"
                    text="white"
                  />
                </Col>
                <Col md={3}>
                  <StatCard
                    value={`${Math.min(...allDataPoints)}°`}
                    label={minLabel}
                    bg="warning"
                    text="white"
                  />
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