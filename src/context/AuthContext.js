import { createContext, useContext, useReducer} from 'react'




const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                name: action.payload.name,
                email: action.payload.email,
                token: action.payload.token
            }

        case 'LOGOUT_SUCCESS':
            return {

                name: '',
                email: '',
                token: ''
            }

        default:
            return state

    }
}

let intialState = {
    name:'',
    email: '',
    token:''
}

export const AuthProvider = ({ children }) => {
    const userState = JSON.parse(localStorage.getItem("quizMaster")) || {name:'',email:'',token:''};
    if(userState){
        intialState.name= userState.name
        intialState.token = userState.token
        intialState.email = userState.email
    }

    const [state, dispatch] = useReducer(authReducer,  intialState )

    return (
        <>
            <AuthContext.Provider value={{user:state,userDispatch:dispatch}}>
                {children}
            </AuthContext.Provider>
        </>)
}

export const useAuth = () => {
    return useContext(AuthContext)
}