import React, { useState } from 'react';
import { Card, Row, Col, Button, Form, Accordion } from 'react-bootstrap';
import FileUpload from './FileUpload';

const AddDatabase = ({ selectedBowler, updateBowlerSessions }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [sessions, setSessions] = useState(selectedBowler.sessions || []);

  const addSession = () => {
    const newSession = {
      id: Date.now(),
      date: selectedDate,
      smplZip: [],
      frameImagesZip: [],
      csvFile: [], // Added csvFile state for each session
    };
    const updatedSessions = [newSession, ...sessions];
    setSessions(updatedSessions);
    updateBowlerSessions(updatedSessions);
  };

  const updateSessionFiles = (sessionId, fileType, files) => {
    const updatedSessions = sessions.map(session =>
      session.id === sessionId
        ? { ...session, [fileType]: files }
        : session
    );
    setSessions(updatedSessions);
    updateBowlerSessions(updatedSessions);
  };

  const handleProcessAndVisualize = (session) => {
    alert(`
      This action would now send the following files to a back-end server for processing:
      - SMPL Data: ${session.smplZip[0]?.name}
      - Frame Images: ${session.frameImagesZip[0]?.name}
      - CSV Data: ${session.csvFile[0]?.name}

      The server would then run your Python scripts.
    `);
  };

  return (
    <div className="add-database">
      {/* Add Session Card */}
      <Card className="mb-4">
        <Card.Body>
          <Row className="align-items-end">
            <Col>
              <h5 className="mb-3">Add New Session</h5>
              <Form.Group>
                <Form.Label>Session Date</Form.Label>
                <Form.Control
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="mb-2"
                />
              </Form.Group>
            </Col>
            <Col xs="auto">
              <Button onClick={addSession} className="btn-primary-custom">
                Create Session
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Existing Sessions Accordion */}
      <h5 className="mb-3">Existing Sessions</h5>
      {sessions.length === 0 ? (
        <Card className="text-center p-5">
          <Card.Body>
            <h3 className="mb-3">📂</h3>
            <h4>No Sessions Found</h4>
            <p className="text-secondary">Create a new session to begin.</p>
          </Card.Body>
        </Card>
      ) : (
        <Accordion defaultActiveKey={sessions[0]?.id.toString()} className="custom-accordion">
          {sessions.map(session => {
            // Updated logic to check for all three files
            const canProcess = session.smplZip.length > 0 && session.frameImagesZip.length > 0 && session.csvFile.length > 0;

            return (
              <Accordion.Item key={session.id} eventKey={session.id.toString()}>
                <Accordion.Header>
                  Session - {new Date(session.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </Accordion.Header>
                <Accordion.Body>
                  {/* File Upload Section - Now 3 columns */}
                  <Row className="g-4 mb-4">
                    <Col md={4}>
                      <h6>SMPL Data (.zip)</h6>
                      <FileUpload
                        accept=".zip"
                        fileType="smplZip"
                        sessionId={session.id}
                        files={session.smplZip}
                        onFilesUpdate={updateSessionFiles}
                        label="Drop SMPL .zip"
                      />
                    </Col>
                    <Col md={4}>
                      <h6>Frame Images (.zip)</h6>
                      <FileUpload
                        accept=".zip"
                        fileType="frameImagesZip"
                        sessionId={session.id}
                        files={session.frameImagesZip}
                        onFilesUpdate={updateSessionFiles}
                        label="Drop Images .zip"
                      />
                    </Col>
                    <Col md={4}>
                      <h6>CSV Data (.csv)</h6>
                      <FileUpload
                        accept=".csv"
                        fileType="csvFile"
                        sessionId={session.id}
                        files={session.csvFile}
                        onFilesUpdate={updateSessionFiles}
                        label="Drop CSV File"
                      />
                    </Col>
                  </Row>
                  
                  {/* Processing Section */}
                  <Card className="mt-4">
                    <Card.Body>
                      <Row className="align-items-center">
                        <Col>
                          <h6 className="mb-1">Analysis & Visualization</h6>
                          <p className="text-secondary mb-0">
                            {canProcess
                              ? 'Ready to process. This will run the backend scripts.'
                              : 'Please upload all three files (SMPL, Images, CSV) to proceed.'
                            }
                          </p>
                        </Col>
                        <Col xs="auto">
                          <Button 
                            className="btn-primary-custom" 
                            disabled={!canProcess}
                            onClick={() => handleProcessAndVisualize(session)}
                          >
                            Process & Visualize
                          </Button>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Accordion.Body>
              </Accordion.Item>
            )
          })}
        </Accordion>
      )}

      {/* --- NEW VIDEO PLAYER SECTION --- */}
      <Card className="mt-4">
        <Card.Header>
          Sample Pose Estimation Video
        </Card.Header>
        <Card.Body className="p-2">
            <video 
              width="100%" 
              loop 
              autoPlay 
              muted 
              playsInline

              src="src\assets\Pose Estimation 1.mp4" 
            >
              Your browser does not support the video tag.
            </video>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddDatabase;