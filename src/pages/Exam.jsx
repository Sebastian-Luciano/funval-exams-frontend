import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import Layout from '../components/Layout';
import VideoRecorder from '../components/VideoRecorder';
import { useAuth } from '../hooks/useAuth';

const Exam = () => {
  const { id } = useParams();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    fetchExam();
  }, [id]);

  const fetchExam = async () => {
    try {
      const response = await api.get(`/exams/${id}`);
      setExam(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    try {
      await api.post(`/exams/${id}/submit`, { answers: userAnswers });
      alert('Examen enviado con éxito');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <Layout><p>Cargando examen...</p></Layout>;
  if (error) return <Layout><p>Error: {error}</p></Layout>;
  if (!exam) return <Layout><p>No se encontró el examen</p></Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">{exam.title}</h1>
      <p className="mb-4">Nivel: {exam.level}</p>
      {exam.questions.map((question, index) => (
        <div key={question._id} className="mb-4">
          <p className="font-semibold">{index + 1}. {question.question}</p>
          
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex}>
              <input 
                type="radio" 
                id={`q${index}-o${optionIndex}`} 
                name={`question-${index}`}
                value={option}
                onChange={() => handleAnswerChange(question._id, option)}
                checked={userAnswers[question._id] === option}
              />
              <label htmlFor={`q${index}-o${optionIndex}`}>{option}</label>
            </div>
          ))}
        </div>
      ))}
      {user.role === 'student' && (
        <>
          <VideoRecorder examId={id} />
          <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded mt-4">
            Finalizar Examen
          </button>
        </>
      )}
    </Layout>
  );
};

export default Exam;