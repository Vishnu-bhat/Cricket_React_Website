import React, { useState, useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const HipFlexionAnalysis = ({ bowler }) => {
  const [timeframe, setTimeframe] = useState('session');
  const chartRef = useRef();

  const safetyZones = {
    safe: { min: 60, max: 75, color: 'rgba(40, 167, 69, 0.3)' },
    warning: { min1: 55, max1: 60, min2: 75, max2: 80, color: 'rgba(255, 193, 7, 0.3)' },
    danger: { color: 'rgba(220, 53, 69, 0.3)' }
  };

  const getChartData = () => {
    if (!bowler.hipFlexionData) return null;

    let data, labels;
    
    switch (timeframe) {
      case 'session':
        data = bowler.hipFlexionData.sessionWise || [];
        labels = data.map(d => d.session);
        break;
      case 'monthly':
        data = bowler.hipFlexionData.monthlyAvg || [];
        labels = data.map(d => d.month);
        break;
      case 'yearly':
        data = bowler.hipFlexionData.yearlyAvg || [];
        labels = data.map(d => d.year);
        break;
      default:
        data = bowler.hipFlexionData.sessionWise || [];
        labels = data.map(d => d.session);
    }

    const angles = data.map(d => d.angle || d.avgAngle);
    
    return {
      labels,
      datasets: [
        {
          label: 'Hip Flexion Angle (°)',
          data: angles,
          borderColor: 'rgb(13, 110, 253)',
          backgroundColor: 'rgba(13, 110, 253, 0.1)',
          pointBackgroundColor: angles.map(angle => {
            if (angle >= 60 && angle <= 75) return '#28a745';
            if ((angle >= 55 && angle < 60) || (angle > 75 && angle <= 80)) return '#ffc107';
            return '#dc3545';
          }),
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6,
          fill: true,
          tension: 0.4
        },
        // Safe Zone
        {
          label: 'Safe Zone',
          data: new Array(labels.length).fill(75),
          borderColor: 'transparent',
          backgroundColor: safetyZones.safe.color,
          fill: '+1'
        },
        {
          label: '',
          data: new Array(labels.length).fill(60),
          borderColor: 'transparent',
          backgroundColor: 'transparent'
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
        text: `Hip Flexion Analysis - ${timeframe.charAt(0).toUpperCase() + timeframe.slice(1)} View`,
        color: '#fff',
        font: { size: 16 }
      },
      legend: {
        labels: {
          color: '#fff',
          filter: (legendItem) => legendItem.text !== ''
        }
      },
      tooltip: {
        callbacks: {
          afterLabel: (context) => {
            const angle = context.parsed.y;
            if (angle >= 60 && angle <= 75) return 'Status: Safe Zone';
            if ((angle >= 55 && angle < 60) || (angle > 75 && angle <= 80)) return 'Status: Warning Zone';
            return 'Status: Danger Zone';
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 45,
        max: 90,
        title: {
          display: true,
          text: 'Hip Flexion Angle (degrees)',
          color: '#fff'
        },
        ticks: {
          color: '#fff'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        title: {
          display: true,
          text: timeframe === 'session' ? 'Sessions' : timeframe === 'monthly' ? 'Months' : 'Years',
          color: '#fff'
        },
        ticks: {
          color: '#fff'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  };

  const getCurrentStatus = () => {
    const latestData = bowler.hipFlexionData?.sessionWise?.slice(-1)[0];
    if (!latestData) return { status: 'Unknown', angle: 0, color: 'secondary' };
    
    const angle = latestData.angle;
    if (angle >= 60 && angle <= 75) return { status: 'Safe', angle, color: 'success' };
    if ((angle >= 55 && angle < 60) || (angle > 75 && angle <= 80)) return { status: 'Warning', angle, color: 'warning' };
    return { status: 'Danger', angle, color: 'danger' };
  };

  const currentStatus = getCurrentStatus();
  const chartData = getChartData();

  return (
    <div className="p-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="text-light mb-2">
            <i className="bi bi-graph-up me-2"></i>
            Hip Flexion Analysis
          </h4>
          <p className="text-muted">Biomechanical analysis of hip movement during bowling action</p>
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
              <div className={`display-6 text-${currentStatus.color} mb-2`}>
                {currentStatus.angle}°
              </div>
              <h6 className="card-title">Current Angle</h6>
              <span className={`badge bg-${currentStatus.color}`}>
                {currentStatus.status}
              </span>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card">
            <div className="card-body text-center">
              <div className="display-6 text-success mb-2">60-75°</div>
              <h6 className="card-title">Safe Range</h6>
              <small className="text-muted">Optimal performance zone</small>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card">
            <div className="card-body text-center">
              <div className="display-6 text-warning mb-2">55-60°<br/>75-80°</div>
              <h6 className="card-title">Warning Range</h6>
              <small className="text-muted">Monitor closely</small>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card">
            <div className="card-body text-center">
              <div className="display-6 text-danger mb-2">&lt;55°<br/>&gt;80°</div>
              <h6 className="card-title">Danger Zone</h6>
              <small className="text-muted">Injury risk high</small>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="card mb-4">
        <div className="card-body" style={{ height: '400px' }}>
          {chartData ? (
            <Line ref={chartRef} data={chartData} options={chartOptions} />
          ) : (
            <div className="d-flex align-items-center justify-content-center h-100">
              <div className="text-center text-muted">
                <i className="bi bi-graph-up display-4"></i>
                <p className="mt-2">No hip flexion data available</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Safety Zone Alert */}
      {currentStatus.status === 'Danger' && (
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          <div>
            <strong>Danger Zone Alert!</strong> Current hip flexion angle ({currentStatus.angle}°) 
            is outside safe parameters. Immediate attention required to prevent injury.
          </div>
        </div>
      )}
      
      {currentStatus.status === 'Warning' && (
        <div className="alert alert-warning d-flex align-items-center" role="alert">
          <i className="bi bi-exclamation-circle-fill me-2"></i>
          <div>
            <strong>Warning Zone!</strong> Hip flexion angle ({currentStatus.angle}°) 
            is approaching danger zone. Monitor closely and consider technique adjustment.
          </div>
        </div>
      )}
    </div>
  );
};

export default HipFlexionAnalysis;
