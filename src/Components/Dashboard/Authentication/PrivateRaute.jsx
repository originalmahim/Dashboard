import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { WholewebsiteContex } from "./AuthProvider";


const PrivateRaute = ({children}) => {

          const {user,spinner} = useContext(WholewebsiteContex)
          const location = useLocation()
          if (spinner) {
             return <div className="flex items-center justify-center"><h1 className="text-center text-4xl text-blue-500  lg:mt-96">Loading...</h1></div>        
          }
          if (user) {
            return children        
          }

          return <Navigate state = {location.pathname} to = "/" ></Navigate>
};

export default PrivateRaute;