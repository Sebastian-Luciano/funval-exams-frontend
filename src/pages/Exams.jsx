import React from 'react';
import { Link } from 'react-router-dom';
import { useExams } from '../hooks/useExams';
import Layout from '../components/Layout';
import ExamCard from '../components/ExamCard';

const Exams = () => {
  const { exams, loading, error } = useExams();

  if (loading) return <Layout><p>Cargando exámenes...</p></Layout>;
  if (error) return <Layout><p>Error: {error}</p></Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Exámenes Disponibles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {exams.map(exam => (
          <ExamCard key={exam._id} exam={exam} />
        ))}
      </div>
    </Layout>
  );
};

export default Exams;