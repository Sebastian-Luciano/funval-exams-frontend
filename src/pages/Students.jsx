/* import React, { useState, useEffect } from 'react';
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

export default Students; */


import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../utils/api';
import { useAuth } from '../hooks/useAuth';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get('/users/students');
        setStudents(response.data);
      } catch (err) {
        setError('Error al cargar los estudiantes');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handleAssignLevel = async (studentId, level) => {
    try {
      await api.post('/teachers/assign-students', {
        studentIds: [studentId],
        level
      });
      setStudents(students.map(student => 
        student._id === studentId ? { ...student, level } : student
      ));
      alert('Nivel asignado con éxito');
    } catch (error) {
      alert('Error al asignar el nivel: ' + error.message);
    }
  };

  if (loading) return <Layout><p>Cargando estudiantes...</p></Layout>;
  if (error) return <Layout><p>{error}</p></Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Students</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Last Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Current Level</th>
            {user.role === 'teacher' && (
              <th className="border border-gray-300 p-2">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student._id}>
              <td className="border border-gray-300 p-2">{student.name}</td>
              <td className="border border-gray-300 p-2">{student.lastName}</td>
              <td className="border border-gray-300 p-2">{student.email}</td>
              <td className="border border-gray-300 p-2">{student.level || 'No asignado'}</td>
              {user.role === 'teacher' && (
                <td className="border border-gray-300 p-2">
                  <select
                    value={student.level || ''}
                    onChange={(e) => handleAssignLevel(student._id, e.target.value)}
                    className="p-1 border rounded"
                  >
                    <option value="">Asignar nivel</option>
                    <option value="Elementary">Elementary</option>
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                  </select>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Students;