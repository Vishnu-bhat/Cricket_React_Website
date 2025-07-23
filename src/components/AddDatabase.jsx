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
      csvFiles: [],
      videoFiles: [],
      smplFiles: []
    };
    const updatedSessions = [newSession, ...sessions]; // Add new session to the top
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

      <h5 className="mb-3">Existing Sessions</h5>
      {sessions.length === 0 ? (
        <Card className="text-center p-5">
          <Card.Body>
            <h3 className="mb-3">📂</h3>
            <h4>No Sessions Found</h4>
            <p className="text-secondary">
              Create a new session above to start uploading files for analysis.
            </p>
          </Card.Body>
        </Card>
      ) : (
        <Accordion defaultActiveKey={sessions[0]?.id.toString()} className="custom-accordion">
          {sessions.map(session => (
            <Accordion.Item key={session.id} eventKey={session.id.toString()}>
              <Accordion.Header>
                Session - {new Date(session.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </Accordion.Header>
              <Accordion.Body>
                <Row className="g-4">
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
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      )}
    </div>
  );
};

export default AddDatabase;