import { useState, useEffect } from 'react';
import api from '../utils/api';

export const useExams = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await api.get('/exams');
      setExams(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const createExam = async (examData) => {
    try {
      const response = await api.post('/exams', examData);
      setExams([...exams, response.data]);
      return response.data;
    } catch (err) {
      console.error('Error al crear examen:', err);
      throw err;
    }
  };

  const updateExam = async (examId, examData) => {
    try {
      const response = await api.put(`/exams/${examId}`, examData);
      setExams(exams.map(exam => exam._id === examId ? response.data : exam));
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteExam = async (examId) => {
    try {
      await api.delete(`/exams/${examId}`);
      setExams(exams.filter(exam => exam._id !== examId));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return { exams, loading, error, createExam, updateExam, deleteExam, fetchExams };
};