import React, { useState } from 'react';
import BowlersListSidebar from './components/BowlersListSidebar';
import BowlerDetailsMain from './components/BowlerDetailsMain';
import AddBowlerModal from './components/AddBowlerModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

const App = () => {
  const [bowlers, setBowlers] = useState([
    {
      id: 1,
      name: "Jasprit Bumrah",
      type: "Fast Bowler",
      totalSessions: 45,
      lastSession: "2025-07-15",
      hipFlexionData: {
        sessionWise: [
          { session: "S1", date: "2025-07-01", angle: 68, status: "safe" },
          { session: "S2", date: "2025-07-05", angle: 72, status: "safe" },
          { session: "S3", date: "2025-07-10", angle: 58, status: "warning" },
          { session: "S4", date: "2025-07-15", angle: 82, status: "danger" }
        ],
        monthlyAvg: [
          { month: "May 2025", avgAngle: 65 },
          { month: "Jun 2025", avgAngle: 70 },
          { month: "Jul 2025", avgAngle: 75 }
        ],
        yearlyAvg: [
          { year: "2023", avgAngle: 68 },
          { year: "2024", avgAngle: 71 },
          { year: "2025", avgAngle: 70 }
        ]
      },
      kneeAnalysis: {
        currentAngle: 145,
        riskLevel: "Low",
        sessions: 45,
        sessionWise: [
          { session: "S1", date: "2025-07-01", angle: 145, status: "safe" },
          { session: "S2", date: "2025-07-05", angle: 148, status: "safe" },
          { session: "S3", date: "2025-07-10", angle: 142, status: "safe" },
          { session: "S4", date: "2025-07-15", angle: 150, status: "safe" }
        ]
      },
      uploadedFiles: {
        csv: ['session_data_2025-07-15.csv', 'performance_metrics.csv'],
        videos: ['bowling_action_s1.mp4', 'side_view_s2.mp4'],
        smpl: ['biomech_data_s1.smpl', 'motion_capture_s2.smpl']
      }
    },
    {
      id: 2,
      name: "Rashid Khan",
      type: "Spin Bowler",
      totalSessions: 52,
      lastSession: "2025-07-18",
      hipFlexionData: {
        sessionWise: [
          { session: "S1", date: "2025-07-03", angle: 61, status: "safe" },
          { session: "S2", date: "2025-07-09", angle: 67, status: "safe" },
          { session: "S3", date: "2025-07-18", angle: 52, status: "danger" }
        ]
      },
      kneeAnalysis: {
        currentAngle: 143,
        riskLevel: "Medium",
        sessions: 52
      }
    },
    {
      id: 3,
      name: "Trent Boult",
      type: "Fast Bowler",
      totalSessions: 41,
      lastSession: "2025-07-14",
      hipFlexionData: {
        sessionWise: [
          { session: "S1", date: "2025-07-01", angle: 70, status: "safe" },
          { session: "S2", date: "2025-07-08", angle: 78, status: "warning" },
          { session: "S3", date: "2025-07-14", angle: 74, status: "safe" }
        ]
      },
      kneeAnalysis: {
        currentAngle: 149,
        riskLevel: "Low",
        sessions: 41
      }
    },
  ]);

  const [selectedBowler, setSelectedBowler] = useState(bowlers[0]);
  const [showModal, setShowModal] = useState(false);

  const handleBowlerSelect = (bowler) => {
    setSelectedBowler(bowler);
  };

  const handleAddBowler = (newBowler) => {
    const bowlerWithId = {
      ...newBowler,
      id: bowlers.length + 1,
      totalSessions: 0,
      lastSession: new Date().toISOString().split('T')[0],
      hipFlexionData: { sessionWise: [], monthlyAvg: [] },
      kneeAnalysis: { currentAngle: 0, riskLevel: "Unknown", sessions: 0 }
    };
    setBowlers([...bowlers, bowlerWithId]);
    setShowModal(false);
  };

  return (
    <div className="bg-dark text-light min-vh-100" data-bs-theme="dark">
      <div className="container-fluid p-0 h-100">
        <div className="row g-0 min-vh-100">
          {/* Left Sidebar - 30% width */}
          <div className="col-lg-3 col-xl-3 border-end border-secondary">
            <BowlersListSidebar 
              bowlers={bowlers}
              selectedBowler={selectedBowler}
              onBowlerSelect={handleBowlerSelect}
              onAddBowlerClick={() => setShowModal(true)}
            />
          </div>

          {/* Main Content - 70% width */}
          <div className="col-lg-9 col-xl-9">
            <BowlerDetailsMain selectedBowler={selectedBowler} />
          </div>
        </div>
      </div>

      {/* Add Bowler Modal */}
      <AddBowlerModal 
        show={showModal}
        onHide={() => setShowModal(false)}
        onAddBowler={handleAddBowler}
      />
    </div>
  );
};

export default App;
