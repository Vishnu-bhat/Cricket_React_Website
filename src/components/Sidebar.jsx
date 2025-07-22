import { useState } from 'react';
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
        <h2 className="mb-5">Bowlers Dashboard</h2>
        
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
          className="btn btn-success w-100 mb-5"
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
              <div>
                <div>
                  <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>{bowler.name}</span>
                </div>
                <small>Age: {bowler.age} | Type: {bowler.bowlingType}</small>
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