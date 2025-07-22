import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

function App() {
  const [selectedBowler, setSelectedBowler] = useState(null);
  const [bowlers, setBowlers] = useState([
    {
      id: 1,
      name: 'Jasprit Bumrah',
      image: 'https://via.placeholder.com/50',
      matches: 75,
      average: 24.3,
      sessions: []
    },
    {
      id: 2,
      name: 'Mohammed Shami',
      image: 'https://via.placeholder.com/50',
      matches: 68,
      average: 27.1,
      sessions: []
    },
    {
      id: 3,
      name: 'Ishant Sharma',
      image: 'https://via.placeholder.com/50',
      matches: 105,
      average: 32.4,
      sessions: []
    }
  ]);

  const addNewBowler = (bowler) => {
    setBowlers([...bowlers, { ...bowler, id: Date.now(), sessions: [] }]);
  };

  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 p-0">
            <Sidebar 
              bowlers={bowlers}
              selectedBowler={selectedBowler}
              setSelectedBowler={setSelectedBowler}
              addNewBowler={addNewBowler}
            />
          </div>
          <div className="col-md-9 p-0">
            <MainContent 
              selectedBowler={selectedBowler}
              bowlers={bowlers}
              setBowlers={setBowlers}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
