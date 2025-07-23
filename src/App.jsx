import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

const initialBowlers = [
    {
      id: 1,
      name: 'Jasprit Bumrah',
      age: 32,
      bowlingType: 'Fast',
      sessions: []
    },
    {
      id: 2,
      name: 'Bowler 2',
      age: 23,
      bowlingType: 'Medium',
      sessions: []
    },
  ]

function App() {
  const [selectedBowler, setSelectedBowler] = useState(null);
  const [bowlers, setBowlers] = useState(initialBowlers);

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
