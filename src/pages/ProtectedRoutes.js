import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function ProtectedRoutes({children}) {
    const {user} = useSelector((state)=>state.user)
    if(!user){
       return <Navigate to='/landing' />

    }
  return <> {children}</>


}

export default ProtectedRoutes