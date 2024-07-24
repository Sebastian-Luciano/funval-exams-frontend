import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import Layout from '../components/Layout';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await api.get('/users/students');
      setStudents(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) return <Layout><p>Cargando estudiantes...</p></Layout>;
  if (error) return <Layout><p>Error: {error}</p></Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Mis Alumnos</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student._id}>
              <td className="py-2 px-4 border-b">{student.name} {student.lastName}</td>
              <td className="py-2 px-4 border-b">{student.email}</td>
              <td className="py-2 px-4 border-b">{student.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Students;