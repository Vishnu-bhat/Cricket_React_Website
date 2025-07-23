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

  const allDataPoints = currentData.datasets.flatMap(ds => ds.data);
  const dangerSessions = allDataPoints.filter(
    value => value < currentData.threshold.min || value > currentData.threshold.max
  ).length;

  return (
    <div className="angle-analysis">
      <Card>
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">{title}</h5>
            <ButtonGroup className="custom-btn-group">
              <Button
                className={viewMode === 'session' ? 'active' : ''}
                onClick={() => setViewMode('session')}
              >
                Session
              </Button>
              <Button
                className={viewMode === 'month' ? 'active' : ''}
                onClick={() => setViewMode('month')}
              >
                Monthly
              </Button>
              <Button
                className={viewMode === 'year' ? 'active' : ''}
                onClick={() => setViewMode('year')}
              >
                Yearly
              </Button>
            </ButtonGroup>
          </div>
        </Card.Header>
        <Card.Body>
          <Row className="mb-4 g-4">
            <Col md={6} lg={3}>
              <div className="stat-card">
                <div className="stat-card-info">
                  <h4>{currentData.threshold.min}° - {currentData.threshold.max}°</h4>
                  <small>{safeLabel}</small>
                </div>
              </div>
            </Col>
            <Col md={6} lg={3}>
              <div className="stat-card">
                <div className="stat-card-info">
                  <h4>{dangerSessions}</h4>
                  <small>{dangerLabel}</small>
                </div>
              </div>
            </Col>
            <Col md={6} lg={3}>
              <div className="stat-card">
                <div className="stat-card-info">
                  <h4>{Math.max(...allDataPoints)}°</h4>
                  <small>{maxLabel}</small>
                </div>
              </div>
            </Col>
            <Col md={6} lg={3}>
              <div className="stat-card">
                <div className="stat-card-info">
                  <h4>{Math.min(...allDataPoints)}°</h4>
                  <small>{minLabel}</small>
                </div>
              </div>
            </Col>
          </Row>
          <AnalysisChart
            title={chartTitle}
            data={currentData}
            type="line"
          />
        </Card.Body>
      </Card>
    </div>
  );
};

export default AngleAnalysis;