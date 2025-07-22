import { useState } from 'react';
import { Nav } from 'react-bootstrap';
import AddDatabase from './AddDatabase';
import AngleAnalysis from './AngleAnalysis';
import PerformanceOverview from './PerformanceOverview';

const MainContent = ({ selectedBowler, bowlers, setBowlers }) => {
  const [activeTab, setActiveTab] = useState('database');

  if (!selectedBowler) {
    return (
      <div className="main-content d-flex align-items-center justify-content-center h-100">
        <div className="text-center">
          <h3 className="text-muted">Select a bowler to view analysis</h3>
          <p className="text-muted">Choose a bowler from the left panel to start analyzing their performance data</p>
        </div>
      </div>
    );
  }

  const updateBowlerSessions = (sessions) => {
    setBowlers(bowlers.map(bowler =>
      bowler.id === selectedBowler.id
        ? { ...bowler, sessions }
        : bowler
    ));
  };

  const hipDataSets = {
    session: {
      labels: ['Session 1', 'Session 2', 'Session 3', 'Session 4', 'Session 5'],
      threshold: { min: 60, max: 80 },
      datasets: [
        {
          label: 'Left Hip',
          data: [65, 72, 68, 75, 70],
          color: 'rgba(54, 162, 235, 1)',
          bgColor: 'rgba(54, 162, 235, 0.2)',
        },
        {
          label: 'Right Hip',
          data: [62, 69, 71, 73, 68],
          color: 'rgba(255, 99, 132, 1)',
          bgColor: 'rgba(255, 99, 132, 0.2)',
        }
      ]
    },
    month: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      threshold: { min: 60, max: 80 },
      datasets: [
        {
          label: 'Left Hip',
          data: [68, 71, 69, 73, 72, 70],
          color: 'rgba(54, 162, 235, 1)',
          bgColor: 'rgba(54, 162, 235, 0.2)',
        },
        {
          label: 'Right Hip',
          data: [66, 70, 68, 71, 70, 69],
          color: 'rgba(255, 99, 132, 1)',
          bgColor: 'rgba(255, 99, 132, 0.2)',
        }
      ]
    },
    year: {
      labels: ['2021', '2022', '2023', '2024'],
      threshold: { min: 60, max: 80 },
      datasets: [
        {
          label: 'Left Hip',
          data: [67, 70, 72, 71],
          color: 'rgba(54, 162, 235, 1)',
          bgColor: 'rgba(54, 162, 235, 0.2)',
        },
        {
          label: 'Right Hip',
          data: [65, 68, 70, 69],
          color: 'rgba(255, 99, 132, 1)',
          bgColor: 'rgba(255, 99, 132, 0.2)',
        }
      ]
    }
  };

  const kneeDataSets = {
    session: {
      labels: ['Session 1', 'Session 2', 'Session 3', 'Session 4', 'Session 5'],
      threshold: { min: 40, max: 55 },
      datasets: [
        {
          label: 'Left Knee',
          data: [45, 52, 48, 56, 50],
          color: 'rgba(75, 192, 192, 1)',
          bgColor: 'rgba(75, 192, 192, 0.2)',
        },
        {
          label: 'Right Knee',
          data: [43, 50, 49, 53, 48],
          color: 'rgba(255, 159, 64, 1)',
          bgColor: 'rgba(255, 159, 64, 0.2)',
        }
      ]
    },
    month: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      threshold: { min: 40, max: 55 },
      datasets: [
        {
          label: 'Left Knee',
          data: [48, 51, 49, 53, 52, 50],
          color: 'rgba(75, 192, 192, 1)',
          bgColor: 'rgba(75, 192, 192, 0.2)',
        },
        {
          label: 'Right Knee',
          data: [46, 49, 48, 51, 50, 49],
          color: 'rgba(255, 159, 64, 1)',
          bgColor: 'rgba(255, 159, 64, 0.2)',
        }
      ]
    },
     year: {
      labels: ['2021', '2022', '2023', '2024'],
      threshold: { min: 40, max: 55 },
      datasets: [
        {
          label: 'Left Knee',
          data: [47, 50, 52, 51],
          color: 'rgba(75, 192, 192, 1)',
          bgColor: 'rgba(75, 192, 192, 0.2)',
        },
        {
          label: 'Right Knee',
          data: [46, 48, 50, 49],
          color: 'rgba(255, 159, 64, 1)',
          bgColor: 'rgba(255, 159, 64, 0.2)',
        }
      ]
    }
  };

  const performanceChartData = {
      labels: hipDataSets.session.labels,
      datasets: [
          ...hipDataSets.session.datasets,
          ...kneeDataSets.session.datasets,
      ]
  };


  return (
    <div className="main-content">
      {/* Header */}
      <div className="bg-light p-4 border-bottom">
        <h2>{selectedBowler.name} - Analysis Dashboard</h2>
        <p className="text-muted mb-2">Age: {selectedBowler.age}   |   Type: {selectedBowler.bowlingType}</p>
      </div>

      {/* Tabs Navigation */}
      <Nav variant="tabs" className="px-3 pt-3">
        <Nav.Item>
          <Nav.Link
            active={activeTab === 'database'}
            onClick={() => setActiveTab('database')}
          >
            Add Database
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            active={activeTab === 'hip'}
            onClick={() => setActiveTab('hip')}
          >
            Hip Flexion Analysis
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            active={activeTab === 'knee'}
            onClick={() => setActiveTab('knee')}
          >
            Knee Analysis
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            active={activeTab === 'performance'}
            onClick={() => setActiveTab('performance')}
          >
            Performance Overview
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Tab Content */}
      <div className="tab-content p-3">
        {activeTab === 'database' && (
          <AddDatabase
            selectedBowler={selectedBowler}
            updateBowlerSessions={updateBowlerSessions}
          />
        )}
        {activeTab === 'hip' && (
          <AngleAnalysis
            title="Hip Flexion Analysis"
            dataSets={hipDataSets}
            chartTitle="Hip Flexion Angle Trends"
          />
        )}
        {activeTab === 'knee' && (
          <AngleAnalysis
            title="Knee Analysis"
            dataSets={kneeDataSets}
            chartTitle="Knee Angle Trends"
          />
        )}
        {activeTab === 'performance' && (
          <PerformanceOverview
            selectedBowler={selectedBowler}
            performanceChartData={performanceChartData}
          />
        )}
      </div>
    </div>
  );
};

export default MainContent;