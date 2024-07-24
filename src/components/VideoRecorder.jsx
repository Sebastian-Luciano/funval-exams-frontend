import React, { useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import api from '../utils/api';

const VideoRecorder = ({ examId }) => {
  const [status, setStatus] = useState('idle');
  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ video: true });

  const handleStartRecording = () => {
    setStatus('recording');
    startRecording();
  };

  const handleStopRecording = () => {
    setStatus('stopped');
    stopRecording();
  };

  const handleUpload = async () => {
    if (!mediaBlobUrl) return;

    const blob = await fetch(mediaBlobUrl).then(r => r.blob());
    const formData = new FormData();
    formData.append('video', blob, 'recording.webm');
    formData.append('examId', examId);

    try {
      await api.post('/videos', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setStatus('uploaded');
    } catch (error) {
      console.error('Error uploading video:', error);
      setStatus('error');
    }
  };

  return (
    <div className="mt-4">
      {status === 'idle' && (
        <button onClick={handleStartRecording} className="bg-green-500 text-white px-4 py-2 rounded">
          Start Recording
        </button>
      )}
      {status === 'recording' && (
        <button onClick={handleStopRecording} className="bg-red-500 text-white px-4 py-2 rounded">
          Stop Recording
        </button>
      )}
      {status === 'stopped' && (
        <>
          <video src={mediaBlobUrl} controls className="mt-4 w-full" />
          <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
            Upload Video
          </button>
        </>
      )}
      {status === 'uploaded' && <p className="text-green-500 mt-4">Video uploaded successfully!</p>}
      {status === 'error' && <p className="text-red-500 mt-4">Error uploading video. Please try again.</p>}
    </div>
  );
};

export default VideoRecorder;