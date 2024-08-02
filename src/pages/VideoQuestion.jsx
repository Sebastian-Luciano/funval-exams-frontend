/* import React, { useState, useRef } from 'react';

const VideoQuestion = ({ question, onRecordingComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const videoRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    try {
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
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error al iniciar la grabación:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <p className="font-semibold mb-2">{question.question}</p>
      <div className="space-y-4">
        <video ref={videoRef} autoPlay muted className="w-full aspect-video" />
        {!isRecording && !videoBlob && (
          <button type="button" onClick={startRecording} className="bg-green-500 text-white px-4 py-2 rounded">
            Iniciar Grabación
          </button>
        )}
        {isRecording && (
          <button type="button" onClick={stopRecording} className="bg-red-500 text-white px-4 py-2 rounded">
            Detener Grabación
          </button>
        )}
        {videoBlob && (
          <video src={URL.createObjectURL(videoBlob)} controls className="w-full aspect-video" />
        )}
      </div>
    </div>
  );
};

export default VideoQuestion; */

// VideoQuestion.jsx
import React, { useState, useRef } from 'react';

const VideoQuestion = ({ question, onSubmit }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const videoRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      const chunks = [];
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        setVideoBlob(blob);
        videoRef.current.src = URL.createObjectURL(blob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error al iniciar la grabación:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSubmit = () => {
    if (videoBlob) {
      onSubmit(question._id, videoBlob);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <p className="font-semibold mb-2">{question.question}</p>
      <div className="space-y-4">
        <video ref={videoRef} controls className="w-full" />
        {!isRecording && !videoBlob && (
          <button onClick={startRecording} className="bg-blue-500 text-white px-4 py-2 rounded">
            Iniciar Grabación
          </button>
        )}
        {isRecording && (
          <button onClick={stopRecording} className="bg-red-500 text-white px-4 py-2 rounded">
            Detener Grabación
          </button>
        )}
        {videoBlob && (
          <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded">
            Enviar Respuesta
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoQuestion;