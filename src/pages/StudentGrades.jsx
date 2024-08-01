// src/pages/StudentGrades.jsx

import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../utils/api';

const StudentGrades = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentGrades = async () => {
      try {
        setLoading(true);
        const response = await api.get('/teachers/student-grades');
        setStudents(response.data);
      } catch (err) {
        console.error('Error fetching student grades:', err);
        setError('Error al cargar las calificaciones de los estudiantes');
      } finally {
        setLoading(false);
      }
    };
    fetchStudentGrades();
  }, []);

  if (loading) return <Layout><p>Cargando calificaciones de estudiantes...</p></Layout>;
  if (error) return <Layout><p>Error: {error}</p></Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Registro de Notas de Estudiantes</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Nombre</th>
            <th className="border border-gray-300 p-2">Apellidos</th>
            {students[0]?.grades.map((grade, index) => (
              <th key={index} className="border border-gray-300 p-2">Examen {index + 1}</th>
            ))}
            <th className="border border-gray-300 p-2">Promedio General</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student._id}>
              <td className="border border-gray-300 p-2">{student.name}</td>
              <td className="border border-gray-300 p-2">{student.lastName}</td>
              {student.grades.map((grade, index) => (
                <td key={index} className="border border-gray-300 p-2">{grade.toFixed(2)}%</td>
              ))}
              <td className="border border-gray-300 p-2">{student.average.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default StudentGrades;