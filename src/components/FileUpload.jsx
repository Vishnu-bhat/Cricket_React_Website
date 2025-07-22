import React, { useState } from 'react';
import { Card, ListGroup, Badge } from 'react-bootstrap';

const FileUpload = ({ accept, fileType, sessionId, files, onFilesUpdate, label }) => {
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    const newFiles = [...files, ...droppedFiles.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date().toISOString()
    }))];
    onFilesUpdate(sessionId, fileType, newFiles);
  };

  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const newFiles = [...files, ...selectedFiles.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date().toISOString()
    }))];
    onFilesUpdate(sessionId, fileType, newFiles);
  };

  const removeFile = (fileId) => {
    const updatedFiles = files.filter(file => file.id !== fileId);
    onFilesUpdate(sessionId, fileType, updatedFiles);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div>
      <Card
        className={`file-upload-zone ${dragOver ? 'drag-over' : ''}`}
        style={{
          border: '2px dashed #ccc',
          backgroundColor: dragOver ? '#f0f8ff' : '#f9f9f9',
          cursor: 'pointer',
          minHeight: '120px'
        }}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
      >
        <Card.Body className="text-center">
          <div className="mb-2">📁</div>
          <p className="mb-2">{label}</p>
          <input
            type="file"
            accept={accept}
            multiple
            onChange={handleFileInput}
            style={{ display: 'none' }}
            id={`file-input-${sessionId}-${fileType}`}
          />
          <label
            htmlFor={`file-input-${sessionId}-${fileType}`}
            className="btn btn-outline-primary btn-sm"
          >
            Choose Files
          </label>
        </Card.Body>
      </Card>

      {files.length > 0 && (
        <ListGroup className="mt-2">
          {files.map(file => (
            <ListGroup.Item key={file.id} className="d-flex justify-content-between align-items-center">
              <div>
                <div className="fw-bold">{file.name}</div>
                <small className="text-muted">
                  {formatFileSize(file.size)} - {new Date(file.uploadDate).toLocaleDateString()}
                </small>
              </div>
              <div>
                <Badge bg="success" className="me-2">Uploaded</Badge>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => removeFile(file.id)}
                >
                  Remove
                </button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default FileUpload;
