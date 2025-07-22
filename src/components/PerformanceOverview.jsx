import React from 'react';
import { Card, Row, Col, ProgressBar } from 'react-bootstrap';
import AnalysisChart from './AnalysisChart';
import StatCard from './StatCard'; // Import the StatCard component

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
      {/* Performance Metrics and Insights Cards */}
      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Header>
              <h5>Current Performance Metrics</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Hip Flexion</span>
                  <span>{overviewData.hipFlexion.current}° / {overviewData.hipFlexion.target}°</span>
                </div>
                <ProgressBar
                  variant={getStatusColor(overviewData.hipFlexion.status)}
                  now={(overviewData.hipFlexion.current / overviewData.hipFlexion.target) * 100}
                />
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Knee Angle</span>
                  <span>{overviewData.kneeAngle.current}° / {overviewData.kneeAngle.target}°</span>
                </div>
                <ProgressBar
                  variant={getStatusColor(overviewData.kneeAngle.status)}
                  now={(overviewData.kneeAngle.current / overviewData.kneeAngle.target) * 100}
                />
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Consistency Score</span>
                  <span>{overviewData.consistency.score}%</span>
                </div>
                <ProgressBar
                  variant={getStatusColor(overviewData.consistency.status)}
                  now={overviewData.consistency.score}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Header>
              <h5>Performance Insights</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <strong>Recent Trend:</strong> {overviewData.improvement.trend} improvement
              </div>
              <div className="mb-3">
                <strong>Recommendations:</strong>
                <ul className="mt-2">
                  <li>Focus on maintaining hip flexion within 65-75° range</li>
                  <li>Work on knee angle consistency</li>
                  <li>Continue current training routine</li>
                </ul>
              </div>
              <div>
                <strong>Next Session Focus:</strong>
                <p className="mt-2">Concentrate on biomechanical alignment during delivery stride</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

            {/* Session Summary using StatCard */}
      <Row  className="mb-4">
        <Col>
          <Card>
            <Card.Header>
              <h5>Session Summary</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={3}>
                  <StatCard
                    value={selectedBowler.sessions?.length || 0}
                    label="Total Sessions"
                    bg="primary"
                    text="white"
                  />
                </Col>
                <Col md={3}>
                  <StatCard
                    value="15"
                    label="Safe Sessions"
                    bg="success"
                    text="white"
                  />
                </Col>
                <Col md={3}>
                  <StatCard
                    value="3"
                    label="Warning Sessions"
                    bg="warning"
                    text="white"
                  />
                </Col>
                <Col md={3}>
                  <StatCard
                    value="1"
                    label="Danger Sessions"
                    bg="danger"
                    text="white"
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Combined Analysis Chart */}
       <Row>
        <Col>
          <Card>
            <Card.Header>
              <h5>Combined Biomechanical Analysis (Last 5 Sessions)</h5>
            </Card.Header>
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