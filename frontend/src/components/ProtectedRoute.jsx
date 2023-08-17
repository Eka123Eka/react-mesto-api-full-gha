import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element: Component, ...props }) {
  return <>
    {props.isLogIn
      ? <Component {...props} />
      : <Navigate to='/signin' replace />}
  </>
}

export default ProtectedRoute;
