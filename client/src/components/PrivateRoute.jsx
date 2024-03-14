import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoute() {
  const { quizappuser } = useSelector((state) => state.user);
  return quizappuser ? <Outlet /> : <Navigate to='/' />;
}
