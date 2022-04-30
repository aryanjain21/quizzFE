
import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import validator from 'validator';
import { userSignup } from '../api'
import Loader from '../loader/Loader'
import toast from 'react-hot-toast'

const style = {
    signupContainer: {
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


const Signup = () => {

    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState({ name: '', err: false, errMsg: '' })
    const [email, setEmail] = useState({ email: '', err: false, errMsg: '' })
    const [password, setPassword] = useState({ password: '', err: false, errMsg: '' })


    const handleOnChange = (key, value) => {
        if (key === 'name') {
            setName({ name: value, err: false, errMsg: '' })
        } else if (key === 'email') {
            setEmail({ email: value, err: false, errMsg: '' })
        } else {
            setPassword({ password: value, err: false, errMsg: '' })
        }
    }

    const onSubmit = async () => {
        try {

            let formValidated = true;
            let userName = name.name.trim()
            let userPassword = password.password.trim();
            if (!validator.isEmail(email.email)) {
                formValidated = false
                setEmail({ ...email, err: true, errMsg: 'Email is not valid' })
            }
            if (userName.length === 0) {
                formValidated = false
                setName({ ...name, err: true, errMsg: 'Name is required.' })
            }
            if (userPassword.length < 8) {
                formValidated = false
                setPassword({ ...password, err: true, errMsg: 'Password must be atleat of 8 character.' })
            }

            if (formValidated) {
                setLoading(true)
                const res = await userSignup({ name: name.name, email: email.email, password: password.password })
                toast.success(res.data.message)
                history.push('/login')
                
                setLoading(false)
                
            }
        } catch (error) {
            setLoading(false)
            toast.error(error.response.data.message)
        }

    }

    return (
        <Box sx={style.signupContainer}>
            <Paper elevation={5} sx={style.paper}>

                <Typography align="center" variant="h4" sx={style.field} >Signup</Typography>
                <Box sx={style.field}>
                    <TextField type="text" variant="standard" placeholder="Enter name" fullWidth onChange={(e) => { handleOnChange('name', e.target.value) }} />
                    {name.err && <span style={style.err}>{name.errMsg}</span>}
                </Box>
                <Box sx={style.field}>
                    <TextField type="text" variant="standard" placeholder="Enter email" fullWidth onChange={(e) => { handleOnChange('email', e.target.value) }} />
                    {email.err && <span style={style.err}>{email.errMsg}</span>}
                </Box>
                <Box sx={style.field}>
                    <TextField type="password" variant="standard" placeholder="Enter password" fullWidth onChange={(e) => { handleOnChange('password', e.target.value) }} />
                    {password.err && <span style={style.err}>{password.errMsg}</span>}
                </Box>
                <Grid align="center">
                    <Button type="submit" sx={{ marginBottom: "0.5rem" }} variant="contained" size="large" onClick={onSubmit} >Signup</Button>
                </Grid>
                <Typography align="center" variant="subtitle1">Already have an account ?<Link to="/login" >Login</Link></Typography>
            </Paper>
            {loading && <Loader loading={loading} />}
        </Box>
    );
}

export default Signup