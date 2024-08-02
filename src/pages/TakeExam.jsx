/*   // src/pages/TakeExam.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Layout from '../components/Layout';
import ExamTimer from '../components/ExamTimer';
import VideoRecorder from '../components/VideoRecorder';
import ErrorBoundary from '../components/ErrorBoundary';

const TakeExam = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [videoBlob, setVideoBlob] = useState(null);
  const [timeUp, setTimeUp] = useState(false);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await api.get(`/exams/${id}`);
        setExam(response.data);
        // Inicializar las respuestas
        const initialAnswers = {};
        response.data.questions.forEach(q => initialAnswers[q._id] = '');
        setAnswers(initialAnswers);
      } catch (error) {
        console.error('Error fetching exam:', error);
        alert('Error al cargar el examen');
      }
    };
    fetchExam();
  }, [id]);

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleVideoRecording = (blob) => {
    setVideoBlob(blob);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('answers', JSON.stringify(answers));
      if (videoBlob) {
        formData.append('video', videoBlob, 'recording.webm');
      }
      const response = await api.post(`/students/submit-exam/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert(`Examen enviado con éxito. Tu calificación es: ${response.data.grade.score}`);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting exam:', error);
      alert('Error al enviar el examen: ' + error.message);
    }
  };

  const handleTimeUp = () => {
    setTimeUp(true);
    handleSubmit();
  };

  if (!exam) return <Layout><p>Cargando examen...</p></Layout>;

  return (
    <Layout>
       <ErrorBoundary>
      <h1 className="text-2xl font-bold mb-4">{exam.title}</h1>
      {exam.timer && <ExamTimer duration={exam.timer} onTimeUp={handleTimeUp} />}
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-6">
        {exam.questions.map((question, index) => (
          <div key={question._id} className="bg-white p-4 rounded shadow">
            <p className="font-semibold mb-2">Pregunta {index + 1}: {question.question}</p>
            {question.type === 'simple' && (
              <input
                type="text"
                value={answers[question._id] || ''}
                onChange={(e) => handleAnswer(question._id, e.target.value)}
                className="w-full p-2 border rounded"
                disabled={timeUp}
              />
            )}
            {question.type === 'multiple' && (
              <div className="space-y-2">
                {question.options.map((option, optIndex) => (
                  <label key={optIndex} className="flex items-center">
                    <input
                      type="radio"
                      name={`question-${question._id}`}
                      value={option}
                      checked={answers[question._id] === option}
                      onChange={() => handleAnswer(question._id, option)}
                      className="mr-2"
                      disabled={timeUp}
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
            {question.type === 'video' && (
              <VideoRecorder onRecordingComplete={handleVideoRecording} />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={timeUp}
        >
          Enviar Examen
        </button>
      </form>
      </ErrorBoundary>
    </Layout>
  );
};

export default TakeExam; 
 */

// OTRO CODIGO BUENO
/* import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Layout from '../components/Layout';
import ExamTimer from '../components/ExamTimer';
import VideoRecorder from '../components/VideoRecorder';


const TakeExam = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [videoBlob, setVideoBlob] = useState(null);
  const [timeUp, setTimeUp] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await api.get(`/exams/${id}`);
        setExam(response.data);
        const initialAnswers = {};
        response.data.questions.forEach(q => initialAnswers[q._id] = '');
        setAnswers(initialAnswers);
      } catch (error) {
        console.error('Error fetching exam:', error);
        setError('Error al cargar el examen');
      } finally {
        setLoading(false);
      }
    };
    fetchExam();
  }, [id]);

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleVideoRecording = (blob) => {
    setVideoBlob(blob);
  };


const handleSubmit = async () => {
  try {
    const formattedAnswers = {};
    Object.keys(answers).forEach(key => {
      formattedAnswers[key] = answers[key].trim();
    });

    const response = await api.post(`/students/submit-exam/${id}`, { answers: formattedAnswers });
    alert(`Examen enviado con éxito. Tu calificación es: ${response.data.grade.score.toFixed(2)}%`);
    navigate('/dashboard');
  } catch (error) {
    console.error('Error submitting exam:', error);
    alert('Error al enviar el examen: ' + (error.response?.data?.error || error.message));
  }
};
  
  const handleTimeUp = () => {
    setTimeUp(true);
    handleSubmit();
  };

  if (loading) return <Layout><p>Cargando examen...</p></Layout>;
  if (error) return <Layout><p>{error}</p></Layout>;
  if (!exam) return <Layout><p>No se encontró el examen</p></Layout>;

  return (
    <Layout>

      <h1 className="text-2xl font-bold mb-4">{exam.title}</h1>
      {exam.timer && <ExamTimer duration={exam.timer} onTimeUp={handleTimeUp} />}
      <form onSubmit={handleSubmit} className="space-y-6">
        {exam.questions.map((question, index) => (
          <div key={question._id} className="bg-white p-4 rounded shadow">
            <p className="font-semibold mb-2">Pregunta {index + 1}: {question.question}</p>
            {question.type === 'simple' && (
              <input
                type="text"
                value={answers[question._id] || ''}
                onChange={(e) => handleAnswer(question._id, e.target.value)}
                className="w-full p-2 border rounded"
                disabled={timeUp}
              />
            )}
            {question.type === 'multiple' && (
              <div className="space-y-2">
                {question.options.map((option, optIndex) => (
                  <label key={optIndex} className="flex items-center">
                    <input
                      type="radio"
                      name={`question-${question._id}`}
                      value={option}
                      checked={answers[question._id] === option}
                      onChange={() => handleAnswer(question._id, option)}
                      className="mr-2"
                      disabled={timeUp}
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
            {question.type === 'video' && (
              <VideoRecorder onRecordingComplete={handleVideoRecording} />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={timeUp}
        >
          Enviar Examen
        </button>
      </form>
    
    </Layout>
  );
};
 
export default TakeExam; */


/*
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Layout from '../components/Layout';
import ExamTimer from '../components/ExamTimer';
import VideoRecorder from '../components/VideoRecorder';

const TakeExam = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [videoBlob, setVideoBlob] = useState(null);
  const [timeUp, setTimeUp] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await api.get(`/exams/${id}`);
        setExam(response.data);
        const initialAnswers = {};
        response.data.questions.forEach(q => initialAnswers[q._id] = '');
        setAnswers(initialAnswers);
      } catch (error) {
        console.error('Error fetching exam:', error);
        setError('Error al cargar el examen');
      } finally {
        setLoading(false);
      }
    };
    fetchExam();
  }, [id]);

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleVideoRecording = (blob) => {
    setVideoBlob(blob);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      Object.keys(answers).forEach(key => {
        formData.append(`answers[${key}]`, answers[key].trim());
      });
      
      if (videoBlob) {
        formData.append('video', videoBlob, 'exam_video.webm');
      }

      const response = await api.post(`/students/submit-exam/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert(`Examen enviado con éxito. Tu calificación es: ${response.data.grade.score.toFixed(2)}%`);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting exam:', error);
      alert('Error al enviar el examen: ' + (error.response?.data?.error || error.message));
    }
  };
  
  const handleTimeUp = () => {
    setTimeUp(true);
    handleSubmit();
  };

  if (loading) return <Layout><p>Cargando examen...</p></Layout>;
  if (error) return <Layout><p>{error}</p></Layout>;
  if (!exam) return <Layout><p>No se encontró el examen</p></Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">{exam.title}</h1>
      {exam.timer && <ExamTimer duration={exam.timer} onTimeUp={handleTimeUp} />}
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-6">
        {exam.questions.map((question, index) => (
          <div key={question._id} className="bg-white p-4 rounded shadow">
            <p className="font-semibold mb-2">Pregunta {index + 1}: {question.question}</p>
            {question.type === 'simple' && (
              <input
                type="text"
                value={answers[question._id] || ''}
                onChange={(e) => handleAnswer(question._id, e.target.value)}
                className="w-full p-2 border rounded"
                disabled={timeUp}
              />
            )}
            {question.type === 'multiple' && (
              <div className="space-y-2">
                {question.options.map((option, optIndex) => (
                  <label key={optIndex} className="flex items-center">
                    <input
                      type="radio"
                      name={`question-${question._id}`}
                      value={option}
                      checked={answers[question._id] === option}
                      onChange={() => handleAnswer(question._id, option)}
                      className="mr-2"
                      disabled={timeUp}
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
            {question.type === 'video' && (
              <VideoRecorder onRecordingComplete={handleVideoRecording} />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={timeUp}
        >
          Enviar Examen
        </button>
      </form>
    </Layout>
  );
};

export default TakeExam;  */



/*  //vale este codigo
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Layout from '../components/Layout';
import ExamTimer from '../components/ExamTimer';

const TakeExam = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeUp, setTimeUp] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await api.get(`/exams/${id}`);
        setExam(response.data);
        const initialAnswers = {};
        response.data.questions.forEach(q => initialAnswers[q._id] = '');
        setAnswers(initialAnswers);
      } catch (error) {
        console.error('Error fetching exam:', error);
        setError('Error al cargar el examen');
      } finally {
        setLoading(false);
      }
    };
    fetchExam();
  }, [id]);

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`/students/submit-exam/${id}`, { answers });
      alert(`Examen enviado con éxito. Tu calificación es: ${response.data.grade.score.toFixed(2)}%`);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting exam:', error);
      alert('Error al enviar el examen: ' + (error.response?.data?.error || error.message));
    }
  };
  
  const handleTimeUp = () => {
    setTimeUp(true);
    handleSubmit();
  };

  if (loading) return <Layout><p>Cargando examen...</p></Layout>;
  if (error) return <Layout><p>{error}</p></Layout>;
  if (!exam) return <Layout><p>No se encontró el examen</p></Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">{exam.title}</h1>
      {exam.timer && <ExamTimer duration={exam.timer} onTimeUp={handleTimeUp} />}
      <form onSubmit={handleSubmit} className="space-y-6">
        {exam.questions.map((question, index) => (
          <div key={question._id} className="bg-white p-4 rounded shadow">
            <p className="font-semibold mb-2">Pregunta {index + 1}: {question.question}</p>
            {question.type === 'simple' && (
              <input
                type="text"
                value={answers[question._id] || ''}
                onChange={(e) => handleAnswer(question._id, e.target.value)}
                className="w-full p-2 border rounded"
                disabled={timeUp}
              />
            )}
            {question.type === 'multiple' && (
              <div className="space-y-2">
                {question.options.map((option, optIndex) => (
                  <label key={optIndex} className="flex items-center">
                    <input
                      type="radio"
                      name={`question-${question._id}`}
                      value={option}
                      checked={answers[question._id] === option}
                      onChange={() => handleAnswer(question._id, option)}
                      className="mr-2"
                      disabled={timeUp}
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={timeUp}
        >
          Enviar Examen
        </button>
      </form>
    </Layout>
  );
};

export default TakeExam;  */

 // src/pages/TakeExam.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Layout from '../components/Layout';
import ExamTimer from '../components/ExamTimer';
import VideoRecorder from '../components/VideoRecorder';

const TakeExam = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [videoBlob, setVideoBlob] = useState(null);
  const [timeUp, setTimeUp] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await api.get(`/exams/${id}`);
        setExam(response.data);
        const initialAnswers = {};
        response.data.questions.forEach(q => initialAnswers[q._id] = '');
        setAnswers(initialAnswers);
      } catch (error) {
        console.error('Error fetching exam:', error);
        setError('Error al cargar el examen');
      } finally {
        setLoading(false);
      }
    };
    fetchExam();
  }, [id]);

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleVideoRecording = (blob) => {
    setVideoBlob(blob);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('answers', JSON.stringify(answers));
      if (videoBlob) {
        formData.append('video', videoBlob, 'exam_video.webm');
      }

      const response = await api.post(`/exams/${id}/submit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      /* const response = await api.post(`/students/submit-exam/${id}`, { answers }); */

      alert(`Examen enviado con éxito. Tu calificación es: ${response.data.grade.score.toFixed(2)}%`);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting exam:', error);
      alert('Error al enviar el examen: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleTimeUp = () => {
    setTimeUp(true);
    handleSubmit({ preventDefault: () => {} });
  };

  if (loading) return <Layout><p>Cargando examen...</p></Layout>;
  if (error) return <Layout><p>{error}</p></Layout>;
  if (!exam) return <Layout><p>No se encontró el examen</p></Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">{exam.title}</h1>
      {exam.timer && <ExamTimer duration={exam.timer} onTimeUp={handleTimeUp} />}
      <form onSubmit={handleSubmit} className="space-y-6">
        {exam.questions.map((question, index) => (
          <div key={question._id} className="bg-white p-4 rounded shadow">
            <p className="font-semibold mb-2">Pregunta {index + 1}: {question.question}</p>
            {question.type === 'simple' && (
              <input
                type="text"
                value={answers[question._id] || ''}
                onChange={(e) => handleAnswer(question._id, e.target.value)}
                className="w-full p-2 border rounded"
                disabled={timeUp}
              />
            )}
            {question.type === 'multiple' && (
              <div className="space-y-2">
                {question.options.map((option, optIndex) => (
                  <label key={optIndex} className="flex items-center">
                    <input
                      type="radio"
                      name={`question-${question._id}`}
                      value={option}
                      checked={answers[question._id] === option}
                      onChange={() => handleAnswer(question._id, option)}
                      className="mr-2"
                      disabled={timeUp}
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
            {question.type === 'video' && (
              <VideoRecorder onRecordingComplete={handleVideoRecording} />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={timeUp}
        >
          Enviar Examen
        </button>
      </form>
    </Layout>
  );
};

export default TakeExam; 
/* 
// src/pages/TakeExam.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Layout from '../components/Layout';
import ExamTimer from '../components/ExamTimer';
import VideoRecorder from '../components/VideoRecorder';

const TakeExam = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [videoBlob, setVideoBlob] = useState(null);
  const [timeUp, setTimeUp] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await api.get(`/exams/${id}`);
        setExam(response.data);
        const initialAnswers = {};
        response.data.questions.forEach(q => initialAnswers[q._id] = '');
        setAnswers(initialAnswers);
      } catch (error) {
        console.error('Error fetching exam:', error);
        setError('Error al cargar el examen');
      } finally {
        setLoading(false);
      }
    };
    fetchExam();
  }, [id]);

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleVideoRecording = (blob) => {
    setVideoBlob(blob);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('answers', JSON.stringify(answers));
      if (videoBlob) {
        formData.append('video', videoBlob, 'exam_video.webm');
      }

      const response = await api.post(`/exams/${id}/submit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert(`Examen enviado con éxito. Tu calificación es: ${response.data.grade.score.toFixed(2)}%`);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting exam:', error);
      alert('Error al enviar el examen: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleTimeUp = () => {
    setTimeUp(true);
    handleSubmit({ preventDefault: () => {} });
  };

  if (loading) return <Layout><p>Cargando examen...</p></Layout>;
  if (error) return <Layout><p>{error}</p></Layout>;
  if (!exam) return <Layout><p>No se encontró el examen</p></Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">{exam.title}</h1>
      {exam.timer && <ExamTimer duration={exam.timer} onTimeUp={handleTimeUp} />}
      <form onSubmit={handleSubmit} className="space-y-6">
        {exam.questions.map((question, index) => (
          <div key={question._id} className="bg-white p-4 rounded shadow">
            <p className="font-semibold mb-2">Pregunta {index + 1}: {question.question}</p>
            {question.type === 'simple' && (
              <input
                type="text"
                value={answers[question._id] || ''}
                onChange={(e) => handleAnswer(question._id, e.target.value)}
                className="w-full p-2 border rounded"
                disabled={timeUp}
              />
            )}
            {question.type === 'multiple' && (
              <div className="space-y-2">
                {question.options.map((option, optIndex) => (
                  <label key={optIndex} className="flex items-center">
                    <input
                      type="radio"
                      name={`question-${question._id}`}
                      value={option}
                      checked={answers[question._id] === option}
                      onChange={() => handleAnswer(question._id, option)}
                      className="mr-2"
                      disabled={timeUp}
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
            {question.type === 'video' && (
              <VideoRecorder onRecordingComplete={handleVideoRecording} />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={timeUp}
        >
          Enviar Examen
        </button>
      </form>
    </Layout>
  );
};

export default TakeExam; */

/* 
// src/pages/TakeExam.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Layout from '../components/Layout';
import ExamTimer from '../components/ExamTimer';
import VideoRecorder from '../components/VideoRecorder';

const TakeExam = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [videoBlob, setVideoBlob] = useState(null);
  const [timeUp, setTimeUp] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await api.get(`/exams/${id}`);
        setExam(response.data);
        const initialAnswers = {};
        response.data.questions.forEach(q => initialAnswers[q._id] = '');
        setAnswers(initialAnswers);
      } catch (error) {
        console.error('Error fetching exam:', error);
        setError('Error al cargar el examen');
      } finally {
        setLoading(false);
      }
    };
    fetchExam();
  }, [id]);

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleVideoRecording = (blob) => {
    setVideoBlob(blob);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('answers', JSON.stringify(answers));
      if (videoBlob) {
        formData.append('video', videoBlob, 'exam_video.webm');
      }

      const response = await api.post(`/exams/${id}/submit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert(`Examen enviado con éxito. Tu calificación es: ${response.data.grade.score.toFixed(2)}%`);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting exam:', error);
      alert('Error al enviar el examen: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleTimeUp = () => {
    setTimeUp(true);
    handleSubmit({ preventDefault: () => {} });
  };

  if (loading) return <Layout><p>Cargando examen...</p></Layout>;
  if (error) return <Layout><p>{error}</p></Layout>;
  if (!exam) return <Layout><p>No se encontró el examen</p></Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">{exam.title}</h1>
      {exam.timer && <ExamTimer duration={exam.timer} onTimeUp={handleTimeUp} />}
      <form onSubmit={handleSubmit} className="space-y-6">
        {exam.questions.map((question, index) => (
          <div key={question._id} className="bg-white p-4 rounded shadow">
            <p className="font-semibold mb-2">Pregunta {index + 1}: {question.question}</p>
            {question.type === 'simple' && (
              <input
                type="text"
                value={answers[question._id] || ''}
                onChange={(e) => handleAnswer(question._id, e.target.value)}
                className="w-full p-2 border rounded"
                disabled={timeUp}
              />
            )}
            {question.type === 'multiple' && (
              <div className="space-y-2">
                {question.options.map((option, optIndex) => (
                  <label key={optIndex} className="flex items-center">
                    <input
                      type="radio"
                      name={`question-${question._id}`}
                      value={option}
                      checked={answers[question._id] === option}
                      onChange={() => handleAnswer(question._id, option)}
                      className="mr-2"
                      disabled={timeUp}
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
            {question.type === 'video' && (
              <VideoRecorder onRecordingComplete={handleVideoRecording} />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={timeUp}
        >
          Enviar Examen
        </button>
      </form>
    </Layout>
  );
};

export default TakeExam; */

/* 
// src/pages/TakeExam.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Layout from '../components/Layout';
import ExamTimer from '../components/ExamTimer';
import VideoRecorder from '../components/VideoRecorder';

const TakeExam = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [videoBlob, setVideoBlob] = useState(null);
  const [timeUp, setTimeUp] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await api.get(`/exams/${id}`);
        setExam(response.data);
        const initialAnswers = {};
        response.data.questions.forEach(q => initialAnswers[q._id] = '');
        setAnswers(initialAnswers);
      } catch (error) {
        console.error('Error fetching exam:', error);
        setError('Error al cargar el examen');
      } finally {
        setLoading(false);
      }
    };
    fetchExam();
  }, [id]);

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleVideoRecording = (blob) => {
    setVideoBlob(blob);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('answers', JSON.stringify(answers));
      if (videoBlob) {
        formData.append('video', videoBlob, 'exam_video.webm');
      }

      const response = await api.post(`/exams/${id}/submit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert(`Examen enviado con éxito. Tu calificación es: ${response.data.grade.score.toFixed(2)}%`);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting exam:', error);
      alert('Error al enviar el examen: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleTimeUp = () => {
    setTimeUp(true);
    handleSubmit({ preventDefault: () => {} });
  };

  if (loading) return <Layout><p>Cargando examen...</p></Layout>;
  if (error) return <Layout><p>{error}</p></Layout>;
  if (!exam) return <Layout><p>No se encontró el examen</p></Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">{exam.title}</h1>
      {exam.timer && <ExamTimer duration={exam.timer} onTimeUp={handleTimeUp} />}
      <form onSubmit={handleSubmit} className="space-y-6">
        {exam.questions.map((question, index) => (
          <div key={question._id} className="bg-white p-4 rounded shadow">
            <p className="font-semibold mb-2">Pregunta {index + 1}: {question.question}</p>
            {question.type === 'simple' && (
              <input
                type="text"
                value={answers[question._id] || ''}
                onChange={(e) => handleAnswer(question._id, e.target.value)}
                className="w-full p-2 border rounded"
                disabled={timeUp}
              />
            )}
            {question.type === 'multiple' && (
              <div className="space-y-2">
                {question.options.map((option, optIndex) => (
                  <label key={optIndex} className="flex items-center">
                    <input
                      type="radio"
                      name={`question-${question._id}`}
                      value={option}
                      checked={answers[question._id] === option}
                      onChange={() => handleAnswer(question._id, option)}
                      className="mr-2"
                      disabled={timeUp}
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
            {question.type === 'video' && (
              <VideoRecorder onRecordingComplete={handleVideoRecording} />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={timeUp}
        >
          Enviar Examen
        </button>
      </form>
    </Layout>
  );
};

export default TakeExam; */

// src/pages/TakeExam.jsx



/* 

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Layout from '../components/Layout';
import ExamTimer from '../components/ExamTimer';
import VideoRecorder from '../components/VideoRecorder';

const TakeExam = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [videoBlob, setVideoBlob] = useState(null);
  const [timeUp, setTimeUp] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await api.get(`/exams/${id}`);
        setExam(response.data);
        const initialAnswers = {};
        response.data.questions.forEach(q => initialAnswers[q._id] = '');
        setAnswers(initialAnswers);
      } catch (error) {
        console.error('Error fetching exam:', error);
        setError('Error al cargar el examen');
      } finally {
        setLoading(false);
      }
    };
    fetchExam();
  }, [id]);

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleVideoRecording = (blob) => {
    setVideoBlob(blob);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('answers', JSON.stringify(answers));
      if (videoBlob) {
        formData.append('video', videoBlob, 'exam_video.webm');
      }

      const response = await api.post(`/exams/${id}/submit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { score, passed } = response.data.grade;
      const message = passed 
        ? `¡Felicidades! Has aprobado el examen con una calificación de ${score}%.`
        : `Lo siento, no has aprobado el examen. Tu calificación es ${score}%.`;

      alert(message);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting exam:', error);
      alert('Error al enviar el examen: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleTimeUp = () => {
    setTimeUp(true);
    handleSubmit({ preventDefault: () => {} });
  };

  if (loading) return <Layout><p>Cargando examen...</p></Layout>;
  if (error) return <Layout><p>{error}</p></Layout>;
  if (!exam) return <Layout><p>No se encontró el examen</p></Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">{exam.title}</h1>
      {exam.timer && <ExamTimer duration={exam.timer} onTimeUp={handleTimeUp} />}
      <form onSubmit={handleSubmit} className="space-y-6">
        {exam.questions.map((question, index) => (
          <div key={question._id} className="bg-white p-4 rounded shadow">
            <p className="font-semibold mb-2">Pregunta {index + 1}: {question.question}</p>
            {question.type === 'simple' && (
              <input
                type="text"
                value={answers[question._id] || ''}
                onChange={(e) => handleAnswer(question._id, e.target.value)}
                className="w-full p-2 border rounded"
                disabled={timeUp}
              />
            )}
            {question.type === 'multiple' && (
              <div className="space-y-2">
                {question.options.map((option, optIndex) => (
                  <label key={optIndex} className="flex items-center">
                    <input
                      type="radio"
                      name={`question-${question._id}`}
                      value={option}
                      checked={answers[question._id] === option}
                      onChange={() => handleAnswer(question._id, option)}
                      className="mr-2"
                      disabled={timeUp}
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
            {question.type === 'video' && (
              <VideoRecorder onRecordingComplete={handleVideoRecording} />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={timeUp}
        >
          Enviar Examen
        </button>
      </form>
    </Layout>
  );
};

export default TakeExam; */

/* 

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Layout from '../components/Layout';
import ExamTimer from '../components/ExamTimer';

const TakeExam = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeUp, setTimeUp] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Video recording states
  const [isRecording, setIsRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const videoRef = useRef(null);
  const chunksRef = useRef([]);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await api.get(`/exams/${id}`);
        setExam(response.data);
        const initialAnswers = {};
        response.data.questions.forEach(q => initialAnswers[q._id] = '');
        setAnswers(initialAnswers);
      } catch (error) {
        console.error('Error fetching exam:', error);
        setError('Error al cargar el examen');
      } finally {
        setLoading(false);
      }
    };
    fetchExam();
  }, [id]);

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('answers', JSON.stringify(answers));
      if (videoBlob) {
        formData.append('video', videoBlob, 'exam_video.webm');
      }

      const response = await api.post(`/students/submit-exam/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(`Examen enviado con éxito. Tu calificación es: ${response.data.grade.score.toFixed(2)}%`);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting exam:', error);
      alert('Error al enviar el examen: ' + (error.response?.data?.error || error.message));
    }
  };
  
  const handleTimeUp = () => {
    setTimeUp(true);
    stopRecording();
    handleSubmit({ preventDefault: () => {} });
  };

  if (loading) return <Layout><p>Cargando examen...</p></Layout>;
  if (error) return <Layout><p>{error}</p></Layout>;
  if (!exam) return <Layout><p>No se encontró el examen</p></Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">{exam.title}</h1>
      {exam.timer && <ExamTimer duration={exam.timer} onTimeUp={handleTimeUp} />}
      <form onSubmit={handleSubmit} className="space-y-6">
        {exam.questions.map((question, index) => (
          <div key={question._id} className="bg-white p-4 rounded shadow">
            <p className="font-semibold mb-2">Pregunta {index + 1}: {question.question}</p>
            {question.type === 'simple' && (
              <input
                type="text"
                value={answers[question._id] || ''}
                onChange={(e) => handleAnswer(question._id, e.target.value)}
                className="w-full p-2 border rounded"
                disabled={timeUp}
              />
            )}
            {question.type === 'multiple' && (
              <div className="space-y-2">
                {question.options.map((option, optIndex) => (
                  <label key={optIndex} className="flex items-center">
                    <input
                      type="radio"
                      name={`question-${question._id}`}
                      value={option}
                      checked={answers[question._id] === option}
                      onChange={() => handleAnswer(question._id, option)}
                      className="mr-2"
                      disabled={timeUp}
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
            {question.type === 'video' && (
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
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={timeUp}
        >
          Enviar Examen
        </button>
      </form>
    </Layout>
  );
};

export default TakeExam; */


