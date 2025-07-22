import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const AnalysisChart = ({ title, data, type }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    
    // Dynamically create datasets from the data prop
    const chartDatasets = data.datasets.map(ds => ({
      label: ds.label,
      data: ds.data,
      borderColor: ds.color,
      backgroundColor: ds.bgColor,
      borderWidth: 2,
      fill: type === 'line',
      tension: 0.4
    }));
    
    // Add safe range lines only if a threshold is provided
    if (data.threshold) {
      chartDatasets.push({
        label: 'Safe Range (Min)',
        data: Array(data.labels.length).fill(data.threshold.min),
        borderColor: 'rgba(40, 167, 69, 0.7)',
        borderDash: [5, 5],
        borderWidth: 2,
        pointRadius: 0,
        fill: false
      });
      chartDatasets.push({
        label: 'Safe Range (Max)',
        data: Array(data.labels.length).fill(data.threshold.max),
        borderColor: 'rgba(40, 167, 69, 0.7)',
        borderDash: [5, 5],
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
      });
    }

    chartInstance.current = new Chart(ctx, {
      type: type,
      data: {
        labels: data.labels,
        datasets: chartDatasets
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
  }, [data, title, type]);

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