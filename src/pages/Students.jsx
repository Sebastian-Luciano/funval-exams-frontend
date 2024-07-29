/* 
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../hooks/useAuth';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [levels, setLevels] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedLevels, setSelectedLevels] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newLevelName, setNewLevelName] = useState('');
  const [newLevelDescription, setNewLevelDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [studentsResponse, levelsResponse] = await Promise.all([
          api.get('/users/students'),
          api.get('/levels')
        ]);
        setStudents(studentsResponse.data);
        setLevels(levelsResponse.data);
      } catch (err) {
        setError('Error fetching data: ' + err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAssignLevel = async () => {
    if (!selectedStudent || !selectedLevels) {
      setError('Please select both a student and a level');
      return;
    }
    try {
      const response = await api.post('/students/assign-level', { studentId: selectedStudent, levelId: selectedLevels });
      setStudents(students.map(student => 
        student._id === selectedStudent 
          ? {...student, currentLevel: levels.find(l => l._id === selectedLevels)} 
          : student
      ));
      setSuccess('Level assigned successfully');
      setError(null);
    } catch (error) {
      setError('Error assigning level: ' + error.message);
      console.error('Error assigning level:', error);
    }
  };

  const handleAddLevel = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/levels', { name: newLevelName, description: newLevelDescription });
      setLevels([...levels, response.data]);
      setSuccess('Level added successfully');
      setError(null);
      setNewLevelName('');
      setNewLevelDescription('');
      setShowModal(false);
    } catch (error) {
      setError('Error adding level: ' + error.message);
      setSuccess(null);
    }
  };

  if (loading) return <Layout><p>Loading students...</p></Layout>;
  if (error) return <Layout><p>{error}</p></Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Assign Level to Students</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Last Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Current Level</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
        {students.length > 0 ? (
            students.map(student => (
            <tr key={student._id}>
              <td className="border border-gray-300 p-2">{student.name}</td>
              <td className="border border-gray-300 p-2">{student.lastName}</td>
              <td className="border border-gray-300 p-2">{student.email}</td>
              <td className="border border-gray-300 p-2">{student.currentLevel ? student.currentLevel.name : 'No asignado'}</td>
              <td className="border border-gray-300 p-2 justify-center">
                <select
                  value={selectedLevels[student._id] || ''}
                  onChange={(e) => setSelectedLevels({...selectedLevels, [student._id]: e.target.value})}
                  className="p-1 border rounded"
                >
                  <option value="">Asignar nivel</option>
                  {levels.map(level => (
                    <option key={level._id} value={level._id}>{level.name}</option>
                  ))}
                </select>
                <button className="mx-1 right-0 bg-blue-500 text-white p-2 rounded" onClick={() => setSelectedStudent(student._id)}>Asignar</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
          <td colSpan="5">No students found</td>
        </tr>
        )}
        </tbody>
      </table>
      <button onClick={handleAssignLevel} type="submit" className="left-0 mt-1 bg-blue-500 text-white p-2 rounded">Guardar cambios</button>
      <Link onClick={() => setShowModal(true)} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">Agregar Nivel</Link>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl mb-4">Agregar Nivel</h2>
            <form onSubmit={handleAddLevel}>
              <div className="mb-4">
                <label className="block text-sm font-medium">Nombre del Nivel:</label>
                <input
                  type="text"
                  value={newLevelName}
                  onChange={(e) => setNewLevelName(e.target.value)}
                  className="border rounded px-2 py-1 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Descripción:</label>
                <input
                  type="text"
                  value={newLevelDescription}
                  onChange={(e) => setNewLevelDescription(e.target.value)}
                  className="border rounded px-2 py-1 w-full"
                  required
                />
              </div>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              {success && <p className="text-green-500 mb-4">{success}</p>}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Agregar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Students; */

import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [levels, setLevels] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [newLevelName, setNewLevelName] = useState('');
  const [newLevelDescription, setNewLevelDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

/*   const fetchData = async () => {
    try {
      setLoading(true);
      const [studentsResponse, levelsResponse] = await Promise.all([
        api.get('/users/students'),
        api.get('/levels')
      ]);

      // Asegurarse de que cada estudiante tenga un campo currentLevel
      const processedStudents = studentsResponse.data.map(student => ({
        ...student,
        currentLevel: student.currentLevel || { name: 'No asignado' }
      }));

      setStudents(studentsResponse.data);
      setLevels(levelsResponse.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching data: ' + err.message);
      setLoading(false);
    }
  };
 */

  const fetchData = async () => {
    try {
      setLoading(true);
      const [studentsResponse, levelsResponse] = await Promise.all([
        api.get('/users/students'),
        api.get('/levels')
      ]);
      
      // Asegurarse de que cada estudiante tenga un campo currentLevel
      const processedStudents = studentsResponse.data.map(student => ({
        ...student,
        currentLevel: student.currentLevel || { name: 'No asignado' }
      }));
      
      setStudents(processedStudents);
      setLevels(levelsResponse.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching data: ' + err.message);
      setLoading(false);
    }
  };

  const handleLevelChange = (studentId, levelId) => {
    setSelectedLevels(prev => ({ ...prev, [studentId]: levelId }));
  };

/*   const handleAssignLevel = async (studentId) => {
    const levelId = selectedLevels[studentId];
    if (!levelId) {
      setError('Please select a level for the student');
      return;
    }
    try {
      await api.post('/students/assign-level', { studentId, levelId });
       setStudents(students.map(student =>
        student._id === studentId
          ? { ...student, currentLevel: levels.find(l => l._id === levelId) }
          : student
      ));
      await fetchData();
      setSuccess('Level assigned successfully');
      setError(null);
    } catch (error) {
      setError('Error assigning level: ' + error.message);
    }
  }; */

  const handleAssignLevel = async (studentId) => {
    const levelId = selectedLevels[studentId];
    if (!levelId) {
      setError('Please select a level for the student');
      return;
    }
    try {
      await api.post('/students/assign-level', { studentId, levelId });
      await fetchData(); // Recargar todos los datos
      setSuccess('Level assigned successfully');
      setError(null);
    } catch (error) {
      setError('Error assigning level: ' + error.message);
    }
  };

  const handleAddLevel = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/levels', { name: newLevelName, description: newLevelDescription });
      setLevels([...levels, response.data]);
      setSuccess('Level added successfully');
      setError(null);
      setNewLevelName('');
      setNewLevelDescription('');
      setShowModal(false);
    } catch (error) {
      setError('Error adding level: ' + error.message);
    }
  };

  if (loading) return <Layout><p>Loading students...</p></Layout>;
  if (error) return <Layout><p>{error}</p></Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Assign Level to Students</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Last Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Current Level</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student._id}>
              <td className="border border-gray-300 p-2">{student.name}</td>
              <td className="border border-gray-300 p-2">{student.lastName}</td>
              <td className="border border-gray-300 p-2">{student.email}</td>
              <td className="border border-gray-300 p-2">{student.currentLevel ? student.currentLevel.name : 'No asignado'}</td>
              <td className="border border-gray-300 p-2">
                <select
                  value={selectedLevels[student._id] || ''}
                  onChange={(e) => handleLevelChange(student._id, e.target.value)}
                  className="p-1 border rounded"
                >
                  <option value="">Seleccionar nivel</option>
                  {levels.map(level => (
                    <option key={level._id} value={level._id}>{level.name}</option>
                  ))}
                </select>
                <button
                  className="ml-2 bg-blue-500 text-white p-2 rounded"
                  onClick={() => handleAssignLevel(student._id)}
                >
                  Asignar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {success && <p className="text-green-500 mt-2">{success}</p>}
      <Link onClick={() => setShowModal(true)} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">Agregar Nivel</Link>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl mb-4">Agregar Nivel</h2>
            <form onSubmit={handleAddLevel}>
              <div className="mb-4">
                <label className="block text-sm font-medium">Nombre del Nivel:</label>
                <input
                  type="text"
                  value={newLevelName}
                  onChange={(e) => setNewLevelName(e.target.value)}
                  className="border rounded px-2 py-1 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Descripción:</label>
                <input
                  type="text"
                  value={newLevelDescription}
                  onChange={(e) => setNewLevelDescription(e.target.value)}
                  className="border rounded px-2 py-1 w-full"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Agregar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Students;