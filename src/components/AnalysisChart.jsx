import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const AnalysisChart = ({ title, data, type, color, backgroundColor }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: type,
      data: {
        labels: data.labels,
        datasets: [
          {
            label: title,
            data: data.data,
            borderColor: color,
            backgroundColor: backgroundColor,
            borderWidth: 2,
            fill: type === 'line',
            tension: 0.4
          },
          {
            label: 'Safe Range (Min)',
            data: Array(data.labels.length).fill(data.threshold.min),
            borderColor: 'rgba(75, 192, 192, 1)',
            borderDash: [5, 5],
            pointRadius: 0,
            fill: false
          },
          {
            label: 'Safe Range (Max)',
            data: Array(data.labels.length).fill(data.threshold.max),
            borderColor: 'rgba(75, 192, 192, 1)',
            borderDash: [5, 5],
            pointRadius: 0,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Angle (degrees)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Time Period'
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          title: {
            display: true,
            text: title
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, title, type, color, backgroundColor]);

  // Use a container with fixed height and relative positioning
  return (
    <div className="chart-container" style={{ position: 'relative', height: '400px', width: '100%' }}>
      <canvas
        ref={chartRef}
        width={800}
        height={400}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default AnalysisChart;
