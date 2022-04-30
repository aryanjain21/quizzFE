import {Route,Redirect } from 'react-router-dom'
import {useAuth} from './context/AuthContext'

const PrivateRoute = ({...props})=>{
    const {user} = useAuth()
    return user.token ? (
        <Route  {...props}/>
      ) : (
        <Redirect to= "/login"/>
      )

}

export default PrivateRoute