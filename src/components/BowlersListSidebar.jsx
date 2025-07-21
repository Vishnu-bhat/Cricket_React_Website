import React from 'react';

const BowlersListSidebar = ({ bowlers, selectedBowler, onBowlerSelect, onAddBowlerClick }) => {
  const getBowlerTypeColor = (type) => {
    switch (type) {
      case 'Fast Bowler': return 'danger';
      case 'Spin Bowler': return 'success';
      case 'Medium Pace': return 'warning';
      default: return 'primary';
    }
  };

  return (
    <div className="h-100 d-flex flex-column p-3">
      {/* Sidebar Header */}
      <div className="mb-4">
        <h2 className="text-primary fw-bold mb-0">
          <i className="bi bi-people-fill me-2"></i>
          CRICKET BOWLERS
        </h2>
        <small className="text-muted">Analytics Dashboard</small>
      </div>

      {/* Bowlers List */}
      <div className="flex-grow-1 mb-3" style={{ overflowY: 'auto' }}>
        {bowlers.map(bowler => (
          <div 
            key={bowler.id}
            className={`card mb-3 cursor-pointer hover-card ${
              selectedBowler?.id === bowler.id ? 'border-primary border-2' : 'border-secondary'
            }`}
            style={{ cursor: 'pointer' }}
            onClick={() => onBowlerSelect(bowler)}
          >
            <div className="card-body p-3">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h6 className="card-title mb-0 text-light fw-semibold">
                  {bowler.name}
                </h6>
                <span className={`badge bg-${getBowlerTypeColor(bowler.type)} text-white`}>
                  {bowler.type}
                </span>
              </div>
              
              <div className="text-muted small">
                <div className="d-flex justify-content-between">
                  <span>
                    <i className="bi bi-calendar-check me-1"></i>
                    Sessions: {bowler.totalSessions}
                  </span>
                </div>
                <div className="mt-1">
                  <i className="bi bi-clock me-1"></i>
                  Last: {new Date(bowler.lastSession).toLocaleDateString()}
                </div>
              </div>
              
              {selectedBowler?.id === bowler.id && (
                <div className="mt-2">
                  <small className="text-primary">
                    <i className="bi bi-check-circle-fill me-1"></i>
                    Selected
                  </small>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Bowler Button */}
      <button 
        className="btn btn-primary btn-lg w-100 shadow"
        onClick={onAddBowlerClick}
      >
        <i className="bi bi-plus-circle me-2"></i>
        Add New Bowler
      </button>
    </div>
  );
};

export default BowlersListSidebar;
