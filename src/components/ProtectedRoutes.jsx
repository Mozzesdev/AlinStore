import { useAuth} from '../context/authContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({children}) => {

 const { user, loading } = useAuth()
  
 if(loading) return <h1 className='extendsNavBar'>Loading...</h1>

 if(!user) return <Navigate to='/shop'/>

  return <>{children}</>
}

export default ProtectedRoutes