import { createContext, useContext, useReducer} from 'react'




const QuizContext = createContext();

const quizReducer = (state, action) => {
    switch (action.type) {
        case 'SET_QUIZ':
            return {
                quiz: action.payload,
                
            }

        default:
            return state

    }
}

let intialState = {
    quiz :[]
}

export const QuizProvider = ({ children }) => {
    

    const [state, dispatch] = useReducer(quizReducer,  intialState )

    return (
        <>
            <QuizContext.Provider value={{quiz:state,quizDispatch:dispatch}}>
                {children}
            </QuizContext.Provider>
        </>)
}

export const useQuiz = () => {
    return useContext(QuizContext)
}