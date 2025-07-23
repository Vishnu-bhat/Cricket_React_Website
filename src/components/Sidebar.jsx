import { useState } from 'react';
import AddBowlerModal from './AddBowlerModal';

const Sidebar = ({ bowlers, selectedBowler, setSelectedBowler, addNewBowler }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  const filteredBowlers = bowlers.filter(bowler =>
    bowler.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="sidebar h-100">
      <div className="p-3">
        <h2 className="mb-4">Bowler HQ</h2>
        
        <div className="mb-3">
          <input
            type="text"
            className="form-control sidebar-search"
            placeholder="Search bowlers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button 
          className="btn btn-add-bowler w-100 mb-4"
          onClick={() => setShowModal(true)}
        >
          + Add New Bowler
        </button>

        <div className="bowlers-list">
          <h6 className="text-muted text-uppercase small px-2 mb-2">Your Bowlers</h6>
          {filteredBowlers.map(bowler => (
            <div
              key={bowler.id}
              className={`sidebar-bowler-item p-3 mb-2 ${
                selectedBowler?.id === bowler.id ? 'active' : ''
              }`}
              onClick={() => setSelectedBowler(bowler)}
            >
              <div>
                <div className="fw-bold">{bowler.name}</div>
                <small className="text-muted">Age: {bowler.age} | Type: {bowler.bowlingType}</small>
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