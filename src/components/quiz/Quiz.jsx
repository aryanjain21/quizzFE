import { useEffect, useState } from "react";
import { Box, Button, Paper } from "@mui/material";
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useQuiz } from '../../context/QuizContext'
import { useLocation, useHistory } from 'react-router-dom'
import Loader from '../loader/Loader'
import { userQuiz } from '../api'
import CircularProgress from '@mui/material/CircularProgress';
import { addUserScore } from '../api'







const Quiz = () => {
    let query = useQuery();
    const history = useHistory();
    let category = query.get('category');
    let diffculty = query.get('diffculty')
    const { quiz, quizDispatch } = useQuiz();
    const [quesCount, setQuesCount] = useState(0);
    const [selectedValue, setSelectedValue] = useState('');
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    const style = {
        rulesContainer: {
            display: 'flex',
            minHeight: "90vh",
            alignItems: "center"
        },
        // paper: {
        //     padding: "20px",
        //     width: `${matches ? "50%" : "300px"}`,
        //     margin: "0 auto",

        // },
    }

    const getUserQuiz = async () => {
        try {
            setLoading(true)
            let quizCategory = category === 'General-Knowledge' ? 'General Knowledge' : category
            const res = await userQuiz({ category: quizCategory, diffculty: diffculty })
            quizDispatch({ type: 'SET_QUIZ', payload: res.data.data })
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    const handleNext = () => {

        let totalQuestion = quiz.quiz.length;
        if (selectedValue) {
            setScore((prevScore) => (quiz.quiz[quesCount].correct_answer === selectedValue ? prevScore + 4 : prevScore - 1))
        }

        if (quesCount < totalQuestion - 1) {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
            setQuesCount(quesCount + 1)
            setSelectedValue('')
        } else {
            let finalScore = score
            if (selectedValue) {
                finalScore = quiz.quiz[quesCount].correct_answer === selectedValue ? score + 4 : score - 1
            }

            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
            submitQuiz(finalScore)
        }
    }

    const submitQuiz = async (finalScore) => {
        try {
            setLoading(true)
            await addUserScore({ category: category, difficulty: diffculty, score: finalScore })
            setLoading(false)
            history.push(`/score?category=${category}&difficulty=${diffculty}&score=${finalScore}`)
        } catch (error) {
            setLoading(false)
        }
    }

    const handleChange = (value) => {
        setSelectedValue(value)
    }

    useEffect(() => {
        getUserQuiz()
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            {

                quiz.quiz.length > 0 && <Box sx={style.rulesContainer}>

                    <Paper sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: "0 auto",
                        padding: {
                            xs: "1rem",
                            sm: "1rem",
                            md: "1rem",
                            xl: "2rem"
                        },
                        width: {
                            xs: "80%",
                            sm: "80%",
                            md: "80%",
                            xl: "70%"
                        }
                    }} elevation={5}>
                        <Box sx={{ position: 'relative', width: '90%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: "10px", marginTop: "5px" }}>


                            <CircularProgress sx={{ position: 'absolute', right: "-25px" }} size={60} thickness={2} variant="determinate" value={progress} />


                            <Box style={{ textAlign: 'center' }}>{score}</Box>
                        </Box>
                        <Box
                            sx={{
                                marginBottom: "1rem",
                                marginTop: "1rem",
                                width: "80%",
                                padding: "5px 6px 5px 0px",
                                fontSize: {
                                    xs: "1rem",
                                    sm: "1rem",
                                    xl: "1.5rem"
                                },
                                fontFamily: 'Poppins',
                                fontWeight: 600,
                                wordBreak: 'break-all',
                                //wordWrap: "break-word",

                                "- webkit - hyphens": "auto",
                                "-ms-hyphens": "auto",
                                hyphens: "auto"

                            }}
                        >
                            Q.{quiz.quiz[quesCount].question}
                        </Box>

                        {/* <FormControl component="fieldset"> */}

                        <Box
                            sx={{
                                border: "1px solid black",
                                borderRadius: "5px",
                                padding: "5px 10px 5px 10px",
                                marginBottom: "1rem",
                                marginTop: "1rem",
                                width: "80%"
                            }}
                        >
                            <FormControlLabel
                                value={`${quiz.quiz[quesCount].options[0]}`}
                                control={<Radio />}
                                label={`${quiz.quiz[quesCount].options[0]}`}
                                onChange={() => { handleChange(`${quiz.quiz[quesCount].options[0]}`) }}
                                checked={selectedValue === `${quiz.quiz[quesCount].options[0]}`}
                            />
                        </Box>

                        <Box
                            sx={{
                                border: "1px solid black",
                                borderRadius: "5px",
                                padding: "5px 8px 5px 8px",
                                marginBottom: "1rem",
                                width: "80%"
                            }}
                        >
                            <FormControlLabel
                                value={`${quiz.quiz[quesCount].options[1]}`}
                                control={<Radio />}
                                label={`${quiz.quiz[quesCount].options[1]}`}
                                onChange={() => { handleChange(`${quiz.quiz[quesCount].options[1]}`) }}
                                checked={selectedValue === `${quiz.quiz[quesCount].options[1]}`}
                            />

                        </Box>
                        <Box
                            sx={{
                                border: "1px solid black",
                                borderRadius: "5px",
                                padding: "5px 8px 5px 8px",
                                marginBottom: "1rem",
                                width: "80%"
                            }}
                        >
                            <FormControlLabel
                                value={`${quiz.quiz[quesCount].options[2]}`}
                                control={<Radio />}
                                label={`${quiz.quiz[quesCount].options[2]}`}
                                onChange={() => { handleChange(`${quiz.quiz[quesCount].options[2]}`) }}
                                checked={selectedValue === `${quiz.quiz[quesCount].options[2]}`}
                            />
                        </Box>

                        <Box
                            sx={{
                                border: "1px solid black",
                                borderRadius: "5px",
                                padding: "5px 8px 5px 8px",
                                marginBottom: "1rem",
                                width: "80%"
                            }}
                        >
                            <FormControlLabel
                                value={`${quiz.quiz[quesCount].options[3]}`}
                                control={<Radio />}
                                label={`${quiz.quiz[quesCount].options[3]}`}
                                onChange={() => { handleChange(`${quiz.quiz[quesCount].options[3]}`) }}
                                checked={selectedValue === `${quiz.quiz[quesCount].options[3]}`}
                            />

                        </Box>

                        <Box sx={{ width: '90%', display: 'flex', justifyContent: 'flex-end' }}>
                            <Button color="primary" variant="contained" onClick={handleNext}>
                                {quesCount === (quiz.quiz.length - 1) ? 'Finish' : 'Next'}
                            </Button>
                        </Box>

                    </Paper>
                </Box>



            }
            { loading && <Loader loading={loading} />}
        </div >

    );
}

export default Quiz