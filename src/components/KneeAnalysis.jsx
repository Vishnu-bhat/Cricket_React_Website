import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

const KneeAnalysis = ({ bowler }) => {
  const [timeframe, setTimeframe] = useState('session');

  const getChartData = () => {
    if (!bowler.kneeAnalysis?.sessionWise) {
      // Generate sample data if not available
      const sampleData = [
        { session: 'S1', angle: 145, status: 'safe' },
        { session: 'S2', angle: 148, status: 'safe' },
        { session: 'S3', angle: 142, status: 'safe' },
        { session: 'S4', angle: 150, status: 'safe' }
      ];
      
      return {
        labels: sampleData.map(d => d.session),
        datasets: [
          {
            label: 'Knee Angle (°)',
            data: sampleData.map(d => d.angle),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.1)',
            pointBackgroundColor: sampleData.map(d => 
              d.status === 'safe' ? '#28a745' : d.status === 'warning' ? '#ffc107' : '#dc3545'
            ),
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 6,
            fill: true,
            tension: 0.4
          }
        ]
      };
    }

    const data = bowler.kneeAnalysis.sessionWise;
    return {
      labels: data.map(d => d.session),
      datasets: [
        {
          label: 'Knee Angle (°)',
          data: data.map(d => d.angle),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.1)',
          pointBackgroundColor: data.map(d => 
            d.status === 'safe' ? '#28a745' : d.status === 'warning' ? '#ffc107' : '#dc3545'
          ),
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6,
          fill: true,
          tension: 0.4
        }
      ]
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Knee Angle Analysis - Front Leg During Delivery',
        color: '#fff',
        font: { size: 16 }
      },
      legend: {
        labels: { color: '#fff' }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 130,
        max: 170,
        title: {
          display: true,
          text: 'Knee Angle (degrees)',
          color: '#fff'
        },
        ticks: { color: '#fff' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      },
      x: {
        title: {
          display: true,
          text: 'Sessions',
          color: '#fff'
        },
        ticks: { color: '#fff' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      }
    }
  };

  const getRiskLevel = () => {
    return bowler.kneeAnalysis?.riskLevel || 'Low';
  };

  const getRiskColor = (level) => {
    switch (level.toLowerCase()) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'danger';
      default: return 'secondary';
    }
  };

  const riskLevel = getRiskLevel();
  const chartData = getChartData();

  return (
    <div className="p-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="text-light mb-2">
            <i className="bi bi-activity me-2"></i>
            Knee Analysis
          </h4>
          <p className="text-muted">Front leg knee angle analysis during bowling delivery</p>
        </div>
        
        {/* Timeframe Selection */}
        <div className="btn-group" role="group">
          {['session', 'monthly', 'yearly'].map(tf => (
            <button
              key={tf}
              className={`btn ${timeframe === tf ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setTimeframe(tf)}
            >
              {tf.charAt(0).toUpperCase() + tf.slice(1)}-wise
            </button>
          ))}
        </div>
      </div>

      {/* Status Cards */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card">
            <div className="card-body text-center">
              <div className="display-6 text-primary mb-2">
                {bowler.kneeAnalysis?.currentAngle || 145}°
              </div>
              <h6 className="card-title">Current Angle</h6>
              <small className="text-muted">Front leg knee</small>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card">
            <div className="card-body text-center">
              <div className={`display-6 text-${getRiskColor(riskLevel)} mb-2`}>
                {riskLevel.toUpperCase()}
              </div>
              <h6 className="card-title">Risk Level</h6>
              <span className={`badge bg-${getRiskColor(riskLevel)}`}>
                Injury Risk
              </span>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card">
            <div className="card-body text-center">
              <div className="display-6 text-success mb-2">140-160°</div>
              <h6 className="card-title">Safe Range</h6>
              <small className="text-muted">Optimal knee flexion</small>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card">
            <div className="card-body text-center">
              <div className="display-6 text-info mb-2">
                {bowler.kneeAnalysis?.sessions || bowler.totalSessions}
              </div>
              <h6 className="card-title">Sessions</h6>
              <small className="text-muted">Analyzed</small>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="card mb-4">
        <div className="card-body" style={{ height: '400px' }}>
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Performance Analysis */}
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h6 className="card-title mb-0">
                <i className="bi bi-clipboard-data me-2"></i>
                Performance Metrics
              </h6>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label small">Load Distribution</label>
                <div className="progress">
                  <div className="progress-bar bg-success" style={{ width: '75%' }}>75%</div>
                </div>
              </div>
              
              <div className="mb-3">
                <label className="form-label small">Stability Index</label>
                <div className="progress">
                  <div className="progress-bar bg-warning" style={{ width: '60%' }}>60%</div>
                </div>
              </div>
              
              <div className="mb-3">
                <label className="form-label small">Impact Absorption</label>
                <div className="progress">
                  <div className="progress-bar bg-info" style={{ width: '80%' }}>80%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h6 className="card-title mb-0">
                <i className="bi bi-exclamation-triangle me-2"></i>
                Risk Assessment
              </h6>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span>Hyperextension Risk</span>
                <span className={`badge bg-${getRiskColor(riskLevel)}`}>
                  {riskLevel}
                </span>
              </div>
              
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span>Lateral Stress</span>
                <span className="badge bg-success">Low</span>
              </div>
              
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span>Fatigue Index</span>
                <span className="badge bg-warning">Medium</span>
              </div>
              
              <hr />
              
              <div className="text-center">
                <h6 className="text-muted">Recommended Action</h6>
                <p className="small">
                  {riskLevel === 'Low' 
                    ? 'Continue current training regimen' 
                    : 'Consider biomechanical assessment and technique adjustment'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KneeAnalysis;
