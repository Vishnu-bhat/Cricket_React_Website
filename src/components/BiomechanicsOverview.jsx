import React from 'react';
import { Line, Doughnut } from 'react-chartjs-2';

const BiomechanicsOverview = ({ bowler }) => {
  const getOverallRiskScore = () => {
    const hipData = bowler.hipFlexionData?.sessionWise?.slice(-1)[0];
    const kneeRisk = bowler.kneeAnalysis?.riskLevel || 'Low';
    
    let score = 0;
    
    // Hip risk assessment
    if (hipData) {
      const angle = hipData.angle;
      if (angle < 55 || angle > 80) score += 3; // High risk
      else if ((angle >= 55 && angle < 60) || (angle > 75 && angle <= 80)) score += 2; // Medium risk
      else score += 1; // Low risk
    }
    
    // Knee risk assessment
    switch (kneeRisk.toLowerCase()) {
      case 'high': score += 3; break;
      case 'medium': score += 2; break;
      default: score += 1; break;
    }
    
    return Math.min(score, 6); // Cap at 6
  };

  const getRiskLevel = (score) => {
    if (score <= 2) return { level: 'Low', color: 'success' };
    if (score <= 4) return { level: 'Medium', color: 'warning' };
    return { level: 'High', color: 'danger' };
  };

  const combinedChartData = {
    labels: ['S1', 'S2', 'S3', 'S4'],
    datasets: [
      {
        label: 'Hip Flexion (°)',
        data: bowler.hipFlexionData?.sessionWise?.map(d => d.angle) || [68, 72, 58, 82],
        borderColor: 'rgb(13, 110, 253)',
        backgroundColor: 'rgba(13, 110, 253, 0.1)',
        yAxisID: 'y'
      },
      {
        label: 'Knee Angle (°)',
        data: [145, 148, 142, 150],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        yAxisID: 'y1'
      }
    ]
  };

  const overallScore = getOverallRiskScore();
  const riskAssessment = getRiskLevel(overallScore);

  const riskDistributionData = {
    labels: ['Low Risk', 'Medium Risk', 'High Risk'],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: [
          'rgba(40, 167, 69, 0.8)',
          'rgba(255, 193, 7, 0.8)',
          'rgba(220, 53, 69, 0.8)'
        ],
        borderWidth: 2,
        borderColor: '#fff'
      }
    ]
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-4">
        <h4 className="text-light mb-2">
          <i className="bi bi-pie-chart me-2"></i>
          Biomechanics Overview
        </h4>
        <p className="text-muted">Comprehensive analysis of all biomechanical parameters</p>
      </div>

      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card">
            <div className="card-body text-center">
              <div className={`display-6 text-${riskAssessment.color} mb-2`}>
                {overallScore}/6
              </div>
              <h6 className="card-title">Overall Risk Score</h6>
              <span className={`badge bg-${riskAssessment.color}`}>
                {riskAssessment.level} Risk
              </span>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card">
            <div className="card-body text-center">
              <div className="display-6 text-primary mb-2">
                {bowler.hipFlexionData?.sessionWise?.slice(-1)[0]?.angle || 'N/A'}°
              </div>
              <h6 className="card-title">Current Hip Angle</h6>
              <small className="text-muted">Latest session</small>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card">
            <div className="card-body text-center">
              <div className="display-6 text-secondary mb-2">
                {bowler.kneeAnalysis?.currentAngle || 145}°
              </div>
              <h6 className="card-title">Current Knee Angle</h6>
              <small className="text-muted">Front leg</small>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card">
            <div className="card-body text-center">
              <div className="display-6 text-info mb-2">
                {bowler.totalSessions}
              </div>
              <h6 className="card-title">Total Sessions</h6>
              <small className="text-muted">Analyzed</small>
            </div>
          </div>
        </div>
      </div>

      {/* Combined Analysis Chart */}
      <div className="row mb-4">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h6 className="card-title mb-0">
                <i className="bi bi-graph-up me-2"></i>
                Multi-Parameter Analysis
              </h6>
            </div>
            <div className="card-body" style={{ height: '350px' }}>
              <Line 
                data={combinedChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      labels: { color: '#fff' }
                    }
                  },
                  scales: {
                    x: {
                      ticks: { color: '#fff' },
                      grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    },
                    y: {
                      type: 'linear',
                      display: true,
                      position: 'left',
                      title: {
                        display: true,
                        text: 'Hip Flexion (°)',
                        color: '#fff'
                      },
                      ticks: { color: '#fff' },
                      grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    },
                    y1: {
                      type: 'linear',
                      display: true,
                      position: 'right',
                      title: {
                        display: true,
                        text: 'Knee Angle (°)',
                        color: '#fff'
                      },
                      ticks: { color: '#fff' },
                      grid: { drawOnChartArea: false }
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h6 className="card-title mb-0">
                <i className="bi bi-pie-chart me-2"></i>
                Risk Distribution
              </h6>
            </div>
            <div className="card-body" style={{ height: '350px' }}>
              <Doughnut 
                data={riskDistributionData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: { color: '#fff' }
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h6 className="card-title mb-0">
                <i className="bi bi-clipboard-data me-2"></i>
                Performance Indicators
              </h6>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <span>Movement Efficiency</span>
                  <div>
                    <div className="progress" style={{ width: '100px', height: '6px' }}>
                      <div className="progress-bar bg-success" style={{ width: '78%' }}></div>
                    </div>
                    <small className="text-muted">78%</small>
                  </div>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <span>Consistency Score</span>
                  <div>
                    <div className="progress" style={{ width: '100px', height: '6px' }}>
                      <div className="progress-bar bg-warning" style={{ width: '65%' }}></div>
                    </div>
                    <small className="text-muted">65%</small>
                  </div>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <span>Injury Prevention</span>
                  <div>
                    <div className="progress" style={{ width: '100px', height: '6px' }}>
                      <div className="progress-bar bg-info" style={{ width: '82%' }}></div>
                    </div>
                    <small className="text-muted">82%</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h6 className="card-title mb-0">
                <i className="bi bi-lightbulb me-2"></i>
                Recommendations
              </h6>
            </div>
            <div className="card-body">
              <ul className="list-unstyled">
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  Continue current hip flexion training
                </li>
                <li className="mb-2">
                  <i className="bi bi-exclamation-circle text-warning me-2"></i>
                  Monitor knee stability during delivery
                </li>
                <li className="mb-2">
                  <i className="bi bi-info-circle text-info me-2"></i>
                  Schedule biomechanical assessment in 2 weeks
                </li>
                <li className="mb-2">
                  <i className="bi bi-arrow-up-circle text-primary me-2"></i>
                  Focus on consistency improvement exercises
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiomechanicsOverview;
