/* import React, { useState, useRef } from 'react';

const VideoRecorder = ({ onRecordingComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const videoRef = useRef(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    videoRef.current.srcObject = stream;
    mediaRecorderRef.current = new MediaRecorder(stream);
    
    const chunks = [];
    mediaRecorderRef.current.ondataavailable = (event) => chunks.push(event.data);
    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      setVideoBlob(blob);
      onRecordingComplete(blob);
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  return (
    <div>
      <video ref={videoRef} autoPlay muted />
      {!isRecording && !videoBlob && (
        <button onClick={startRecording} className="bg-green-500 text-white px-4 py-2 rounded">
          Start Recording
        </button>
      )}
      {isRecording && (
        <button onClick={stopRecording} className="bg-red-500 text-white px-4 py-2 rounded">
          Stop Recording
        </button>
      )}
      {videoBlob && (
        <video src={URL.createObjectURL(videoBlob)} controls />
      )}
    </div>
  );
};

export default VideoRecorder; */


import React, { useState, useRef, useCallback } from 'react';

const VideoRecorder = ({ onRecordingComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const videoRef = useRef(null);
  const chunksRef = useRef([]);

  

  const startRecording = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    videoRef.current.srcObject = stream;
    mediaRecorderRef.current = new MediaRecorder(stream);
  
     mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };
 
    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      setVideoBlob(blob);
      onRecordingComplete(blob);
      stream.getTracks().forEach(track => track.stop());
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
    setIsPaused(false);
  }, [onRecordingComplete]);

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && isPaused) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
    }
  };

  return (
    <div className="video-recorder">
      <video ref={videoRef} autoPlay muted className="video-preview" />
      {!isRecording && !videoBlob && (
        <button onClick={startRecording} className="btn btn-primary bg-green-500 text-white px-4 py-2 rounded">
          Iniciar Grabación
        </button>
      )}
      {isRecording && !isPaused && (
        <button onClick={pauseRecording} className="btn btn-warning bg-gray-500 text-white px-4 py-2 rounded">
          Pausar Grabación
        </button>
      )}
      {isRecording && isPaused && (
        <button onClick={resumeRecording} className="btn btn-info bg-green-500 text-white px-4 py-2 rounded">
          Continuar Grabación
        </button>
      )}
      {isRecording && (
        <button onClick={stopRecording} className="btn btn-danger bg-red-500 text-white px-4 py-2 rounded">
          Detener Grabación
        </button>
      )}
      {videoBlob && (
        <video src={URL.createObjectURL(videoBlob)} controls className="recorded-video" />
      )}
    </div>
  );
};

export default VideoRecorder;