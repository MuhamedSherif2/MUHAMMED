import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from '@/context';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const context = useContext(Context);

  if (!context?.userToken) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;