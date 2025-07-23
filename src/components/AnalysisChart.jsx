import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const AnalysisChart = ({ title, data, type }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Define colors based on the new UI palette from App.css
  const colors = {
    danger: '#FF453A', // Red color for safe range
    textPrimary: '#000000',
    textSecondary: '#8A8A8E',
    gridColor: '#E5E5EA'
  };

  useEffect(() => {
    // Set default font styles for Chart.js to match the app's theme
    Chart.defaults.font.family = 'Inter, sans-serif';
    Chart.defaults.font.size = 12;
    Chart.defaults.color = colors.textSecondary;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    
    // The 'color' prop from MainContent.jsx is now used directly here
    const chartDatasets = data.datasets.map(ds => ({
      label: ds.label,
      data: ds.data,
      borderColor: ds.color, // Use the color passed from MainContent
      borderWidth: 3,
      fill: false,
      tension: 0.4,
      pointRadius: 4,
      pointBackgroundColor: ds.color,
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointHoverRadius: 7,
      pointHoverBackgroundColor: ds.color,
    }));
    
    // Add styled safe range lines, now in RED
    if (data.threshold) {
      chartDatasets.push({
        label: 'Safe Range',
        data: Array(data.labels.length).fill(data.threshold.min),
        borderColor: colors.danger, // Using danger color for safe range
        borderDash: [5, 5],
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
        // Hides the second 'Safe Range' label in the legend
        legend: {
          display: false
        }
      });
      chartDatasets.push({
        label: 'Safe Range (Max)', // This label will be hidden
        data: Array(data.labels.length).fill(data.threshold.max),
        borderColor: colors.danger, // Using danger color for safe range
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
            beginAtZero: false,
            title: {
              display: true,
              text: 'Angle (degrees)',
              font: { weight: '600' }
            },
            grid: {
              color: colors.gridColor,
              drawBorder: false,
            }
          },
          x: {
            title: {
              display: true,
              text: 'Time Period',
              font: { weight: '600' }
            },
            grid: {
              display: false,
            }
          }
        },
        plugins: {
          legend: {
            position: 'bottom',
            // Filter out one of the 'Safe Range' labels to avoid duplicates
            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
              padding: 20,
              font: {
                size: 14
              },
              filter: function(legendItem, chartData) {
                return legendItem.text !== 'Safe Range (Max)';
              }
            }
          },
          title: {
            display: true,
            text: title,
            font: {
              size: 18,
              weight: '700',
            },
            color: colors.textPrimary,
            padding: {
              bottom: 20
            }
          },
          tooltip: {
            enabled: true,
            backgroundColor: '#000',
            titleFont: { size: 14, weight: 'bold' },
            bodyFont: { size: 12 },
            padding: 10,
            cornerRadius: 8,
            displayColors: true,
            boxPadding: 4
          }
        },
        interaction: {
            intersect: false,
            mode: 'index',
        },
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
      <canvas ref={chartRef} />
    </div>
  );
};

export default AnalysisChart;