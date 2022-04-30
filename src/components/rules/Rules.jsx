import { Box, Button, Chip, Paper, Typography, Grid } from "@mui/material";
import { useState } from "react";
import { useLocation, useHistory } from 'react-router-dom'
import Loader from '../loader/Loader'
import toast from 'react-hot-toast'

const style = {
    rulesContainer: {
        display: 'flex',
        minHeight: "90vh",
        alignItems: "center"
    },
    paper: {
        padding: "20px",
        width: {
            xs:"90%",
            sm:"50%",
            md:"25%",
            lg:"25%"
        },
        margin: "0 auto",

    },
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Rules = () => {
    let query = useQuery();
    const history = useHistory();
    let category = query.get('category');
    const [diffculty, setDiffculty] = useState('');
    const [loading, setLoading] = useState(false)

    const selectDiffculty = (level) => {
        setDiffculty(level)
    }

    const onStart = async () => {
        try {
            if (diffculty === '') {
                //alert('Select diffculty')
                toast.error('Select Difficulty Level',{
                    position:'top-center',
                    duration:1500
                })
            } else {
                //setLoading(true)
                //let quizCategory = category === 'General-Knowledge' ? 'General Knowledge' : category
                //const res = await userQuiz({ category: quizCategory, diffculty: diffculty })
                //quizDispatch({ type: 'SET_QUIZ', payload: res.data.data })
                //setLoading(false)
                history.push(`/quiz?category=${category}&diffculty=${diffculty}`)
            }

        } catch (error) {
            setLoading(false)
            toast.error('Something Went Wrong')
        }
    }

    return (
        <Box sx={style.rulesContainer}>
            <Paper sx={style.paper} eleveation={5}>
                <Typography variant="h6">Instructions</Typography>
                <Box sx={{ marginBottom: "0.8rem" }}>1. For every right answer 4 marks will be awarded.</Box>
                <Box sx={{ marginBottom: "0.8rem" }}>2. For every wrong answer 1 mark will be deducted.</Box>
                <Box sx={{ marginBottom: "0.8rem" }}>3. Select the level of diffculty from below.</Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Chip color="primary" label="Easy" variant={diffculty === 'easy' ? "filled" : "outlined"} onClick={() => { selectDiffculty('easy') }} />
                    <Chip color="secondary" label="Medium" variant={diffculty === 'medium' ? "filled" : "outlined"} onClick={() => { selectDiffculty('medium') }} />
                    <Chip color="warning" label="Diffcult" variant={diffculty === 'hard' ? "filled" : "outlined"} onClick={() => { selectDiffculty('hard') }} />
                </Box>
                <Grid align="center" sx={{ marginTop: "0.8rem" }}>
                    <Button variant="contained" size="large" color="secondary" onClick={onStart}>Start</Button>
                </Grid>


            </Paper>
            {loading && <Loader loading={loading} />}
        </Box>
    );
}

export default Rules