import { useState } from 'react'
import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { Link, useHistory } from 'react-router-dom'
import validator from 'validator';
import { userLogin } from '../api'
import Loader from '../loader/Loader'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'

const style = {
    loginContainer: {
        display: 'flex',
        minHeight: "90vh",
        alignItems: "center"
    },
    paper: {
        padding: "25px",
        width: "240px",
        margin: "0 auto",

    },
    field: {
        marginBottom: "1rem"
    },
    err: {
        color: "red",
        fontSize: '0.8rem'
    }
}


const Login = () => {
    const { userDispatch } = useAuth()
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState({ email: '', err: false, errMsg: '' })
    const [password, setPassword] = useState({ password: '', err: false, errMsg: '' })


    const handleOnChange = (key, value) => {
        if (key === 'email') {
            setEmail({ email: value, err: false, errMsg: '' })
        } else {
            setPassword({ password: value, err: false, errMsg: '' })
        }
    }

    const guestLogin = async () => {
        try {
            setLoading(true)
            const res = await userLogin({ email:"guest@yopmail.com", password:"12345678" })
            toast.success(res.data.message)
            let user = res.data.data
            userDispatch({ type: 'LOGIN_SUCCESS', payload: user })
            localStorage.setItem('quizMaster', JSON.stringify({ name: user.name, email: user.email, token: user.token }))
            setLoading(false)
            history.push('/home')
        } catch (error) {
            setLoading(false)
            toast.error(error.response.data.message)
        }
    }

    const onSubmit = async () => {
        try {

            let formValidated = true;

            let userPassword = password.password.trim();
            if (!validator.isEmail(email.email)) {
                formValidated = false
                setEmail({ ...email, err: true, errMsg: 'Email is not valid' })
            }
            if (userPassword.length === 0) {
                formValidated = false
                setPassword({ ...password, err: true, errMsg: 'Password is required.' })
            }

            if (formValidated) {
                setLoading(true)
                const res = await userLogin({ email: email.email, password: password.password })
                toast.success(res.data.message)
                let user = res.data.data
                userDispatch({ type: 'LOGIN_SUCCESS', payload: user })
                localStorage.setItem('quizMaster', JSON.stringify({ name: user.name, email: user.email, token: user.token }))
                setLoading(false)
                history.push('/home')
            }
        } catch (error) {
            setLoading(false)
            toast.error(error.response.data.message)
        }

    }

    return (
        <Box sx={style.loginContainer}>
            <Paper elevation={5} sx={style.paper}>

                <Typography align="center" variant="h4" sx={style.field} >Login</Typography>
                <Box sx={style.field}>
                    <TextField type="text" variant="standard" placeholder="Enter email" fullWidth onChange={(e) => { handleOnChange('email', e.target.value) }} />
                    {email.err && <span style={style.err}>{email.errMsg}</span>}
                </Box>
                <Box sx={style.field}>
                    <TextField type="password" variant="standard" placeholder="Enter password" fullWidth onChange={(e) => { handleOnChange('password', e.target.value) }} />
                    {password.err && <span style={style.err}>{password.errMsg}</span>}
                </Box>
                <Grid align="center">
                    <Button sx={{ marginBottom: "0.5rem",paddingLeft:"3rem",paddingRight:"3rem"  }} variant="contained" size="large" onClick={onSubmit} >Login</Button>
                    <Button type="button" sx={{ marginBottom: "0.5rem"}} variant="contained" size="large" onClick={guestLogin} >Guest Login</Button>
                </Grid>
                <Typography align="center" variant="subtitle1">Don't have an account ?<Link to="/signup" >Signup</Link></Typography>
            </Paper>
            {loading && <Loader loading={loading} />}
        </Box>
    );
}

export default Login