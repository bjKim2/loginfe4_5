import React from 'react'
import { Navigate } from 'react-router-dom';
import todoPage from '../pages/TodoPage';
 
const PrivateRoute = ({user,children}) => {
    // children 은 새끼 컴포넌트들을 의미한다. 따라서 변수 전달하지 않아도 된다.
    return user ? children : <Navigate to = "/login" />;
}
export default PrivateRoute;