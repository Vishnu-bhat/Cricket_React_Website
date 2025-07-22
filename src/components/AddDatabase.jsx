import React, { useState } from 'react';
import { Card, Row, Col, Button, Form } from 'react-bootstrap';
import FileUpload from './FileUpload';

const AddDatabase = ({ selectedBowler, updateBowlerSessions }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [sessions, setSessions] = useState(selectedBowler.sessions || []);

  const addSession = () => {
    const newSession = {
      id: Date.now(),
      date: selectedDate,
      csvFiles: [],
      videoFiles: [],
      smplFiles: []
    };
    const updatedSessions = [...sessions, newSession];
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

  return (
    <div className="add-database">
      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h5>Add New Session</h5>
              <Form.Group className="mb-3">
                <Form.Label>Session Date</Form.Label>
                <Form.Control
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" onClick={addSession}>
                Create Session
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h5>Existing Sessions</h5>
      {sessions.length === 0 ? (
        <Card>
          <Card.Body className="text-center">
            <p className="text-muted">No sessions found. Create a new session to start uploading files.</p>
          </Card.Body>
        </Card>
      ) : (
        sessions.map(session => (
          <Card key={session.id} className="mb-3">
            <Card.Header>
              <h6>Session - {new Date(session.date).toLocaleDateString()}</h6>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={4}>
                  <h6>CSV Files</h6>
                  <FileUpload
                    accept=".csv"
                    fileType="csvFiles"
                    sessionId={session.id}
                    files={session.csvFiles}
                    onFilesUpdate={updateSessionFiles}
                    label="Drop CSV files here"
                  />
                </Col>
                <Col md={4}>
                  <h6>Video Files</h6>
                  <FileUpload
                    accept="video/*"
                    fileType="videoFiles"
                    sessionId={session.id}
                    files={session.videoFiles}
                    onFilesUpdate={updateSessionFiles}
                    label="Drop video files here"
                  />
                </Col>
                <Col md={4}>
                  <h6>SMPL Files</h6>
                  <FileUpload
                    accept=".smpl"
                    fileType="smplFiles"
                    sessionId={session.id}
                    files={session.smplFiles}
                    onFilesUpdate={updateSessionFiles}
                    label="Drop SMPL files here"
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default AddDatabase;