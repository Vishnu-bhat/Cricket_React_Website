import React, { useState } from 'react';
import AddBowlerModal from './AddBowlerModal';

const Sidebar = ({ bowlers, selectedBowler, setSelectedBowler, addNewBowler }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  const filteredBowlers = bowlers.filter(bowler =>
    bowler.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="sidebar bg-dark text-white h-100">
      <div className="p-3">
        <h4 className="mb-4">Bowlers Dashboard</h4>
        
        {/* Search Bar */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search bowlers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Add New Bowler Button */}
        <button 
          className="btn btn-success w-100 mb-4"
          onClick={() => setShowModal(true)}
        >
          + Add New Bowler
        </button>

        {/* Bowlers List */}
        <div className="bowlers-list">
          {filteredBowlers.map(bowler => (
            <div
              key={bowler.id}
              className={`bowler-card p-3 mb-2 rounded cursor-pointer ${
                selectedBowler?.id === bowler.id ? 'bg-primary' : 'bg-secondary'
              }`}
              onClick={() => setSelectedBowler(bowler)}
            >
              <div className="d-flex align-items-center">
                <img
                  src={bowler.image}
                  alt={bowler.name}
                  className="rounded-circle me-3"
                  width="40"
                  height="40"
                />
                <div>
                  <h6 className="mb-1">{bowler.name}</h6>
                  <small>Matches: {bowler.matches} | Avg: {bowler.average}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddBowlerModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onAdd={addNewBowler}
      />
    </div>
  );
};

export default Sidebar;