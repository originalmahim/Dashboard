import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged} from "firebase/auth";
import app from "./firebase.config";



    //Created ContexApi - For Objerving user behaivior
       export  const WholewebsiteContex = createContext(null)
          const auth = getAuth(app)
          
          
          const AuthProvider = ({children}) => {

          const [user,setusr] = useState(null)
               const [spinner,setSpinner] = useState(true)

          const Login = (email,password) => {
               setSpinner(true)
          return signInWithEmailAndPassword(auth,email,password)
          }

          const logOut = () => {
               setSpinner(true)
          return signOut(auth)
          }

          // const axiosSecure = useAxios()

          useEffect(() => {
             const unSubscribe =  onAuthStateChanged(auth,currentUser => {
                    console.log('objerving', currentUser);
               setusr(currentUser)
                    setSpinner(false)
                    
               })
               return () => {
                    unSubscribe()
               }
          },[])

          const userinformation = {
                    Login,
                    logOut,
                    user,
                    spinner
          }

          return (
          <WholewebsiteContex.Provider value={userinformation} >
               {children}               
          </WholewebsiteContex.Provider>
          );
};

AuthProvider.propTypes = {
          children: PropTypes.node.isRequired,
}

export default AuthProvider;