import { useAuth} from '../context/authContext'
import { Navigate } from 'react-router-dom'
import style from 'styled-components'

const ProtectedRoutesAdmin = ({children}) => {

 const { user, loading } = useAuth()

 if(loading) return (
   <>
   <PageLoading className='extendsNavBar'>
      <Spinner />
   </PageLoading>
   </>
 )
 
 if(user?.role !== "admin") return <Navigate to='/shop'/>

  return <>{children}</>
}

export default ProtectedRoutesAdmin

const PageLoading = style.div`
  width: 100%;
  height: 120vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

const Spinner = style.div`
  border: 4px solid #1a1a1a;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border-left-color: transparent;
  margin-bottom: 250px;

  animation: spin 1s linear infinite;
`;