/* import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../hooks/useAuth';
import ErrorBoundary from '../components/ErrorBoundary';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <ErrorBoundary>
      <h1 className="text-2xl font-bold mb-4">Bienvenido, {user.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {user.role === 'teacher' && (
          <>
            <Link to="/exams" className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600">
              Gestionar Exámenes
            </Link>
            <Link to="/students" className="bg-green-500 text-white p-4 rounded hover:bg-green-600">
              Gestionar Estudiantes
            </Link>
          </>
        )}
        {user.role === 'student' && (
          <>
            <Link to="/student-exams" className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600">
              Ver Exámenes Disponibles
            </Link>
            <Link to="/grades" className="bg-green-500 text-white p-4 rounded hover:bg-green-600">
              Ver Calificaciones
            </Link>
          </>
        )}
        <Link to="/videos" className="bg-purple-500 text-white p-4 rounded hover:bg-purple-600">
          Ver Videos
        </Link>
      </div>
      </ErrorBoundary>
    </Layout>
  );
};

export default Dashboard; */

// src/pages/Dashboard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../hooks/useAuth';
import ErrorBoundary from '../components/ErrorBoundary';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <Layout>
       <ErrorBoundary>
      <h1 className="text-2xl font-bold mb-4">Bienvenido, {user.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {user.role === 'teacher' && (
          <>
            <Link to="/exams" className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600">
              Gestionar Exámenes
            </Link>
            <Link to="/students" className="bg-green-500 text-white p-4 rounded hover:bg-green-600">
              Gestionar Estudiantes
            </Link>
            <Link to="/student-grades" className="bg-yellow-500 text-white p-4 rounded hover:bg-yellow-600">
              Registro de Notas
            </Link>
          </>
        )}
        {user.role === 'student' && (
          <>
            <Link to="/student-exams" className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600">
              Ver Exámenes Disponibles
            </Link>
            <Link to="/grades" className="bg-green-500 text-white p-4 rounded hover:bg-green-600">
              Ver Calificaciones
            </Link>
          </>
        )}
        <Link to="/videos" className="bg-purple-500 text-white p-4 rounded hover:bg-purple-600">
          Ver Videos
        </Link>
      </div>
      </ErrorBoundary>
    </Layout>
  );
};

export default Dashboard;