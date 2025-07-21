import React, { useState } from 'react';

const AddDatabaseTab = ({ bowler }) => {
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState(bowler.uploadedFiles || {
    csv: [],
    videos: [],
    smpl: []
  });

  const handleFileUpload = (fileType, files) => {
    const fileArray = Array.from(files);
    
    fileArray.forEach((file, index) => {
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(prev => ({
          ...prev,
          [`${fileType}-${file.name}`]: progress
        }));

        if (progress >= 100) {
          clearInterval(interval);
          // Add to uploaded files
          setUploadedFiles(prev => ({
            ...prev,
            [fileType]: [...prev[fileType], file.name]
          }));
          
          // Remove from progress
          setTimeout(() => {
            setUploadProgress(prev => {
              const newProgress = { ...prev };
              delete newProgress[`${fileType}-${file.name}`];
              return newProgress;
            });
          }, 1000);
        }
      }, 100);
    });
  };

  const FileUploadCard = ({ title, fileType, accept, description, icon, bgColor }) => (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <div className={`card-header ${bgColor} text-white`}>
          <h5 className="card-title mb-0">
            <i className={`${icon} me-2`}></i>
            {title}
          </h5>
        </div>
        <div className="card-body">
          <p className="text-muted small mb-3">{description}</p>
          
          {/* File Upload Zone */}
          <div className="border border-2 border-dashed rounded p-4 text-center mb-3 upload-zone">
            <i className={`${icon} display-6 text-muted mb-2`}></i>
            <p className="mb-2">Drag & drop files here</p>
            <input
              type="file"
              multiple
              accept={accept}
              onChange={(e) => handleFileUpload(fileType, e.target.files)}
              className="form-control"
              id={`${fileType}Upload`}
            />
          </div>

          {/* Upload Progress */}
          {Object.entries(uploadProgress).map(([key, progress]) => 
            key.startsWith(fileType) && (
              <div key={key} className="mb-2">
                <small className="text-muted">{key.split('-').slice(1).join('-')}</small>
                <div className="progress" style={{ height: '5px' }}>
                  <div 
                    className="progress-bar progress-bar-striped progress-bar-animated"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )
          )}

          {/* Uploaded Files */}
          <div className="uploaded-files">
            <h6 className="text-muted small mb-2">Uploaded Files:</h6>
            {uploadedFiles[fileType]?.map((fileName, index) => (
              <div key={index} className="d-flex justify-content-between align-items-center mb-1">
                <span className="small text-success">
                  <i className="bi bi-check-circle me-1"></i>
                  {fileName}
                </span>
                <small className="text-muted">{new Date().toLocaleDateString()}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4">
      <div className="mb-4">
        <h4 className="text-light mb-2">
          <i className="bi bi-database me-2"></i>
          Session Database Management
        </h4>
        <p className="text-muted">Upload and manage bowler session data, videos, and biomechanical files</p>
      </div>

      <div className="row">
        <FileUploadCard
          title="CSV Data Files"
          fileType="csv"
          accept=".csv"
          description="Session performance data, statistics, and metrics"
          icon="bi-file-earmark-spreadsheet"
          bgColor="bg-success"
        />
        
        <FileUploadCard
          title="Video Files"
          fileType="videos"
          accept=".mp4,.avi,.mov"
          description="Bowling action videos for analysis"
          icon="bi-camera-video"
          bgColor="bg-primary"
        />
        
        <FileUploadCard
          title="SMPL Files"
          fileType="smpl"
          accept=".smpl"
          description="3D motion capture and biomechanical data"
          icon="bi-person-arms-up"
          bgColor="bg-warning"
        />
      </div>

      {/* Session Summary */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <i className="bi bi-calendar3 me-2"></i>
                Session Summary
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-3">
                  <div className="text-center">
                    <div className="display-6 text-primary">{uploadedFiles.csv?.length || 0}</div>
                    <small className="text-muted">CSV Files</small>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="text-center">
                    <div className="display-6 text-success">{uploadedFiles.videos?.length || 0}</div>
                    <small className="text-muted">Video Files</small>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="text-center">
                    <div className="display-6 text-warning">{uploadedFiles.smpl?.length || 0}</div>
                    <small className="text-muted">SMPL Files</small>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="text-center">
                    <div className="display-6 text-info">{bowler.totalSessions}</div>
                    <small className="text-muted">Total Sessions</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDatabaseTab;
