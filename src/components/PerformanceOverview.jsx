import React from 'react';
import { Card, Row, Col, ProgressBar } from 'react-bootstrap';
import AnalysisChart from './AnalysisChart';

const PerformanceOverview = ({ selectedBowler, performanceChartData }) => {
  const overviewData = {
    hipFlexion: { current: 72, target: 70, status: 'good' },
    kneeAngle: { current: 48, target: 50, status: 'warning' },
    consistency: { score: 85, status: 'excellent' },
    improvement: { trend: '+5%', status: 'positive' }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'success';
      case 'good': return 'info';
      case 'warning': return 'warning';
      case 'danger': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <div className="performance-overview">
      <Row className="mb-4 g-4">
        <Col md={6} lg={3}>
            <div className="stat-card">
              <div className="stat-card-icon icon-total">#</div>
              <div className="stat-card-info">
                <h4>{selectedBowler.sessions?.length || 0}</h4>
                <small>Total Sessions</small>
              </div>
            </div>
        </Col>
        <Col md={6} lg={3}>
            <div className="stat-card">
              <div className="stat-card-icon icon-safe">✓</div>
              <div className="stat-card-info">
                <h4>15</h4>
                <small>Safe Sessions</small>
              </div>
            </div>
        </Col>
        <Col md={6} lg={3}>
            <div className="stat-card">
              <div className="stat-card-icon icon-warning">!</div>
              <div className="stat-card-info">
                <h4>3</h4>
                <small>Warning Sessions</small>
              </div>
            </div>
        </Col>
        <Col md={6} lg={3}>
            <div className="stat-card">
              <div className="stat-card-icon icon-danger">✗</div>
              <div className="stat-card-info">
                <h4>1</h4>
                <small>Danger Sessions</small>
              </div>
            </div>
        </Col>
      </Row>

      <Row className="g-4">
        <Col lg={6}>
          <Card className="h-100">
            <Card.Header>Current Performance Metrics</Card.Header>
            <Card.Body>
              <div className="mb-4">
                <div className="d-flex justify-content-between">
                  <span>Hip Flexion</span>
                  <span className="fw-bold">{overviewData.hipFlexion.current}° / {overviewData.hipFlexion.target}°</span>
                </div>
                <ProgressBar
                  className="mt-2"
                  variant={getStatusColor(overviewData.hipFlexion.status)}
                  now={(overviewData.hipFlexion.current / overviewData.hipFlexion.target) * 100}
                />
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between">
                  <span>Knee Angle</span>
                  <span className="fw-bold">{overviewData.kneeAngle.current}° / {overviewData.kneeAngle.target}°</span>
                </div>
                <ProgressBar
                  className="mt-2"
                  variant={getStatusColor(overviewData.kneeAngle.status)}
                  now={(overviewData.kneeAngle.current / overviewData.kneeAngle.target) * 100}
                />
              </div>

              <div>
                <div className="d-flex justify-content-between">
                  <span>Consistency Score</span>
                  <span className="fw-bold">{overviewData.consistency.score}%</span>
                </div>
                <ProgressBar
                  className="mt-2"
                  variant={getStatusColor(overviewData.consistency.status)}
                  now={overviewData.consistency.score}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="h-100">
            <Card.Header>Performance Insights</Card.Header>
            <Card.Body>
              <div className="mb-3">
                <strong>Recent Trend:</strong> {overviewData.improvement.trend} improvement
              </div>
              <div className="mb-3">
                <strong>Recommendations:</strong>
                <ul className="mt-2 ps-3">
                  <li>Focus on maintaining hip flexion within 65-75° range</li>
                  <li>Work on knee angle consistency</li>
                  <li>Continue current training routine</li>
                </ul>
              </div>
              <div>
                <strong>Next Session Focus:</strong>
                <p className="mt-1 text-secondary">Concentrate on biomechanical alignment during delivery stride</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Header>Combined Biomechanical Analysis (Last 5 Sessions)</Card.Header>
            <Card.Body>
              <AnalysisChart
                title="All Angles Overview"
                data={performanceChartData}
                type="line"
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PerformanceOverview;