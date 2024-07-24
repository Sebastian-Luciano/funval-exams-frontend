import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Layout from '../components/Layout';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Bienvenido, {user.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/exams" className="bg-blue-500 text-white p-4 rounded-lg text-center hover:bg-blue-600">
          {user.role === 'student' ? 'Ver Exámenes' : 'Gestionar Exámenes'}
        </Link>
        <Link to={user.role === 'student' ? "/videos/me" : "/students"} className="bg-green-500 text-white p-4 rounded-lg text-center hover:bg-green-600">
          {user.role === 'student' ? 'Mis Videos' : 'Mis Alumnos'}
        </Link>
        {user.role === 'teacher' && (
          <Link to="/exams/create" className="bg-purple-500 text-white p-4 rounded-lg text-center hover:bg-purple-600">
            Crear Nuevo Examen
          </Link>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;