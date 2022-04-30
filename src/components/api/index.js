import axios from 'axios'

export const userSignup = (data) => {
    return axios.post(`${process.env.REACT_APP_BACKEND}user/auth/register`, data)
}


export const userLogin = (data) => {
    return axios.post(`${process.env.REACT_APP_BACKEND}user/auth/login`, data)
}

export const userQuiz = (data)=>{
    return axios.post(`${process.env.REACT_APP_BACKEND}quiz/api/get_quiz`, data)
}

export const addUserScore = (data)=>{
    return axios.post(`${process.env.REACT_APP_BACKEND}user/api/add_user_score`, data)
}

export const getUserScorecard = (data)=>{
    return axios.get(`${process.env.REACT_APP_BACKEND}user/api/get_user_scorecard`)
}

export const getWorldScoreBoard = (data)=>{
    return axios.post(`${process.env.REACT_APP_BACKEND}quiz/auth/get_world_scoreboard`,data)
}
