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

  // Updated color palette for angles
  const angleColors = {
    leftHip: '#5E5CE6', // Primary Purple
    rightHip: '#BF5AF2', // Vibrant Pink/Magenta
    leftKnee: '#32D74B', // Success Green
    rightKnee: '#00C7BE', // Teal
  };

  const hipDataSets = {
    session: {
      labels: ['Session 1', 'Session 2', 'Session 3', 'Session 4', 'Session 5'],
      threshold: { min: 60, max: 80 },
      datasets: [
        {
          label: 'Left Hip',
          data: [65, 72, 68, 75, 70],
          color: angleColors.leftHip,
        },
        {
          label: 'Right Hip',
          data: [62, 69, 71, 73, 68],
          color: angleColors.rightHip,
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
          color: angleColors.leftHip,
        },
        {
          label: 'Right Hip',
          data: [66, 70, 68, 71, 70, 69],
          color: angleColors.rightHip,
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
          color: angleColors.leftHip,
        },
        {
          label: 'Right Hip',
          data: [65, 68, 70, 69],
          color: angleColors.rightHip,
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
          color: angleColors.leftKnee,
        },
        {
          label: 'Right Knee',
          data: [43, 50, 49, 53, 48],
          color: angleColors.rightKnee,
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
          color: angleColors.leftKnee,
        },
        {
          label: 'Right Knee',
          data: [46, 49, 48, 51, 50, 49],
          color: angleColors.rightKnee,
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
          color: angleColors.leftKnee,
        },
        {
          label: 'Right Knee',
          data: [46, 48, 50, 49],
          color: angleColors.rightKnee,
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
      <div className="mb-4">
        <h2>{selectedBowler.name} - Analysis Dashboard</h2>
        <p className="text-secondary">Age: {selectedBowler.age}   |   Type: {selectedBowler.bowlingType}</p>
      </div>

      <Nav variant="tabs" className="mb-4">
        <Nav.Item>
          <Nav.Link
            className={activeTab === 'database' ? 'active' : ''}
            onClick={() => setActiveTab('database')}
          >
            Add Database
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            className={activeTab === 'performance' ? 'active' : ''}
            onClick={() => setActiveTab('performance')}
          >
            Performance Overview
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            className={activeTab === 'hip' ? 'active' : ''}
            onClick={() => setActiveTab('hip')}
          >
            Hip Flexion Analysis
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            className={activeTab === 'knee' ? 'active' : ''}
            onClick={() => setActiveTab('knee')}
          >
            Knee Analysis
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <div className="tab-content">
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