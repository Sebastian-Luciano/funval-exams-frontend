/* // src/pages/Grades.jsx
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../utils/api';

const Grades = () => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await api.get('/students/grades');
        setGrades(response.data);
      } catch (err) {
        setError('Error al cargar las calificaciones');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchGrades();
  }, []);

  if (loading) return <Layout><p>Cargando calificaciones...</p></Layout>;
  if (error) return <Layout><p>{error}</p></Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Mis Calificaciones</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Examen</th>
            <th className="border border-gray-300 p-2">Calificación</th>
            <th className="border border-gray-300 p-2">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {grades.map(grade => (
            <tr key={grade._id}>
              <td className="border border-gray-300 p-2">{grade.exam.title}</td>
              <td className="border border-gray-300 p-2">{grade.score.toFixed(2)}%</td>
              <td className="border border-gray-300 p-2">{new Date(grade.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Grades; */
/* // src/pages/Grades.jsx
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../utils/api';
import ErrorBoundary from '../components/ErrorBoundary';

const Grades = () => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        setLoading(true);
        console.log('Fetching grades...');
        const response = await api.get('/students/grades');
        console.log('Grades received:', response.data);
        setGrades(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching grades:', err);
        setError('Error al cargar las calificaciones: ' + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };
    fetchGrades();
  }, []);

  if (loading) return <Layout><p>Cargando calificaciones...</p></Layout>;
  if (error) return <Layout><p>Error: {error}</p></Layout>;

  return (
    <Layout>
       <ErrorBoundary>
      <h1 className="text-2xl font-bold mb-4">Mis Calificaciones</h1>
      {grades.length === 0 ? (
        <p>No hay calificaciones disponibles.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Examen</th>
              <th className="border border-gray-300 p-2">Calificación</th>
              <th className="border border-gray-300 p-2">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {grades.map(grade => (
              <tr key={grade._id}>
                <td className="border border-gray-300 p-2">{grade.exam?.title || 'N/A'}</td>
                <td className="border border-gray-300 p-2">{grade.score.toFixed(2) || 'N/A'}%</td>
                <td className="border border-gray-300 p-2">{new Date(grade.submitted).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </ErrorBoundary>
    </Layout>
  );
};

export default Grades; */
/* 
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../utils/api';

const Grades = () => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [average, setAverage] = useState(0);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        setLoading(true);
        const response = await api.get('/students/grades');
        setGrades(response.data);
        calculateAverage(response.data);
      } catch (err) {
        console.error('Error fetching grades:', err);
        setError('Error al cargar las calificaciones: ' + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };
    fetchGrades();
  }, []);

  const calculateAverage = (grades) => {
    if (grades.length === 0) return;
    const sum = grades.reduce((acc, grade) => acc + grade.score, 0);
    const avg = sum / grades.length;
    setAverage(avg);
  };

  if (loading) return <Layout><p>Cargando calificaciones...</p></Layout>;
  if (error) return <Layout><p>Error: {error}</p></Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Mis Calificaciones</h1>
      {grades.length === 0 ? (
        <p>No hay calificaciones disponibles.</p>
      ) : (
        <>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Examen</th>
                <th className="border border-gray-300 p-2">Calificación</th>
                <th className="border border-gray-300 p-2">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {grades.map(grade => (
                <tr key={grade._id}>
                  <td className="border border-gray-300 p-2">{grade.exam?.title || 'N/A'}</td>
                  <td className="border border-gray-300 p-2">{grade.score.toFixed(2) || 'N/A'}%</td>
                  <td className="border border-gray-300 p-2">{new Date(grade.submitted).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4">
            <p className="font-bold">Promedio General: {average.toFixed(2)}%</p>
            {average >= 80 && (
              <p className="text-green-600 font-bold mt-2">¡Felicidades! Has aprobado el curso.</p>
            )}
          </div>
        </>
      )}
    </Layout>
  );
};

export default Grades; */

import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../utils/api';
import ErrorBoundary from '../components/ErrorBoundary';

const Grades = () => {
  const [grades, setGrades] = useState([]);
  const [average, setAverage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        setLoading(true);
        console.log('Fetching grades...');
        const response = await api.get('/students/grades');
        console.log('Grades received:', response.data);
        setGrades(response.data.grades);
        setAverage(response.data.average);
        setError(null);
      } catch (err) {
        console.error('Error fetching grades:', err);
        setError('Error al cargar las calificaciones: ' + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };
    fetchGrades();
  }, []);

  if (loading) return <Layout><p>Cargando calificaciones...</p></Layout>;
  if (error) return <Layout><p>Error: {error}</p></Layout>;

  return (
    <Layout>
      <ErrorBoundary>
        <h1 className="text-2xl font-bold mb-4">Mis Calificaciones</h1>
        {grades.length === 0 ? (
          <p>No hay calificaciones disponibles.</p>
        ) : (
          <>
            <p className="mb-4">Promedio general: {average.toFixed(2)}%</p>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">Examen</th>
                  <th className="border border-gray-300 p-2">Calificación</th>
                  <th className="border border-gray-300 p-2">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {grades.map(grade => (
                  <tr key={grade._id}>
                    <td className="border border-gray-300 p-2">{grade.exam?.title || 'N/A'}</td>
                    <td className="border border-gray-300 p-2">{grade.score.toFixed(2)}%</td>
                    <td className="border border-gray-300 p-2">{new Date(grade.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </ErrorBoundary>
    </Layout>
  );
};

export default Grades;


