import { useContext } from "react";
import { AuthContext } from "./_auth/AuthProvider/AuthProvider";
import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types'
const PrivateRoutes = ({ children }) => {
    const { user,loading } = useContext(AuthContext);
    if(loading){
        return <div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>
    }
    if (user) return (children);
    else <Navigate to='/'></Navigate>
};

export default PrivateRoutes;

PrivateRoutes.PropTypes={
   children:PropTypes.node
}