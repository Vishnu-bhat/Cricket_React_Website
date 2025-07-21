import React, { useState } from 'react';
import AddDatabaseTab from './AddDatabaseTab';
import HipFlexionAnalysis from './HipFlexionAnalysis';
import KneeAnalysis from './KneeAnalysis';
import BiomechanicsOverview from './BiomechanicsOverview';

const BowlerDetailsMain = ({ selectedBowler }) => {
  const [activeTab, setActiveTab] = useState('database');

  if (!selectedBowler) {
    return (
      <div className="d-flex align-items-center justify-content-center h-100">
        <div className="text-center text-muted">
          <i className="bi bi-person-plus display-1"></i>
          <h4 className="mt-3">Select a Bowler</h4>
          <p>Choose a bowler from the sidebar to view their analysis</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'database', label: 'Add Database', icon: 'bi-database' },
    { id: 'hip', label: 'Hip Flexion Analysis', icon: 'bi-graph-up' },
    { id: 'knee', label: 'Knee Analysis', icon: 'bi-activity' },
    { id: 'overview', label: 'Biomechanics Overview', icon: 'bi-pie-chart' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'database':
        return <AddDatabaseTab bowler={selectedBowler} />;
      case 'hip':
        return <HipFlexionAnalysis bowler={selectedBowler} />;
      case 'knee':
        return <KneeAnalysis bowler={selectedBowler} />;
      case 'overview':
        return <BiomechanicsOverview bowler={selectedBowler} />;
      default:
        return <AddDatabaseTab bowler={selectedBowler} />;
    }
  };

  return (
    <div className="h-100 d-flex flex-column">
      {/* Header */}
      <div className="bg-dark border-bottom border-secondary p-4">
        <h3 className="text-light mb-1">
          <i className="bi bi-person-circle me-2 text-primary"></i>
          {selectedBowler.name}
        </h3>
        <div className="d-flex gap-3 text-muted">
          <span>
            <i className="bi bi-trophy me-1"></i>
            {selectedBowler.type}
          </span>
          <span>
            <i className="bi bi-calendar3 me-1"></i>
            {selectedBowler.totalSessions} Sessions
          </span>
          <span>
            <i className="bi bi-clock me-1"></i>
            Last: {new Date(selectedBowler.lastSession).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-dark border-bottom border-secondary">
        <ul className="nav nav-tabs border-0 px-4" role="tablist">
          {tabs.map(tab => (
            <li key={tab.id} className="nav-item" role="presentation">
              <button
                className={`nav-link px-4 py-3 border-0 ${
                  activeTab === tab.id 
                    ? 'active bg-primary text-white' 
                    : 'text-light bg-transparent'
                }`}
                onClick={() => setActiveTab(tab.id)}
                type="button"
                role="tab"
              >
                <i className={`${tab.icon} me-2`}></i>
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Tab Content */}
      <div className="flex-grow-1 overflow-auto">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default BowlerDetailsMain;
