import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import AddDatabase from './AddDatabase';
import HipFlexionAnalysis from './HipFlexionAnalysis';
import KneeAnalysis from './KneeAnalysis';
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

  return (
    <div className="main-content">
      {/* Header */}
      <div className="bg-light p-3 border-bottom">
        <h4>{selectedBowler.name} - Analysis Dashboard</h4>
        <p className="text-muted mb-0">Matches: {selectedBowler.matches} | Average: {selectedBowler.average}</p>
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
          <HipFlexionAnalysis selectedBowler={selectedBowler} />
        )}
        {activeTab === 'knee' && (
          <KneeAnalysis selectedBowler={selectedBowler} />
        )}
        {activeTab === 'performance' && (
          <PerformanceOverview selectedBowler={selectedBowler} />
        )}
      </div>
    </div>
  );
};

export default MainContent;