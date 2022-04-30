import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Paper, Typography } from '@mui/material';
import { getUserScorecard } from '../api'
import { useEffect, useState } from 'react';
import Loader from '../loader/Loader'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom';

const Scoreboard = () => {
    
    const [loading, setLoading] = useState(false)
    const [scoreCard, setScoreCard] = useState([]);

    const getScoreCard = async () => {
        try {
            setLoading(true)
            const res = await getUserScorecard();
            setScoreCard(res.data.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            toast.error('Something went wrong!')
        }
    }

    useEffect(() => {
        getScoreCard()
    }, [])


    return (
        <Box
        sx={{
            display:'flex',
            alignItems:'center',
            flexDirection:'column',
            marginTop:'3rem'
        }}
        >
            {
                scoreCard && scoreCard.length > 0 ? (scoreCard.map(score => {
                    return <Box>
                        <Typography variant="h4" gutterBottom={2}>{score.category}</Typography>
                        <TableContainer   sx={{marginBottom:"1rem",width:{lg:"700px"} }} component={Paper}>
                            <Table sx={{width:{lg:"700px"}}} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{fontSize:{sm:'1rem',lg:'1.2rem'}}}>No</TableCell>
                                        <TableCell sx={{fontSize:{sm:'1rem',lg:'1.2rem'}}} align="left">Score</TableCell>
                                        <TableCell sx={{fontSize:{sm:'1rem',lg:'1.2rem'}}} align="left">Difficulty</TableCell>
                                        <TableCell sx={{fontSize:{sm:'1rem',lg:'1.2rem'}}} align="left">Played At</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {score.scorecard.map((row, index) => (
                                        <TableRow
                                            key={index + 1}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell sx={{fontSize:"1.2rem"}} component="th" scope="row">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell sx={{fontSize:{sm:'1rem',lg:'1.2rem'},textTransform:'capitalize'}} align="left">{row.score}</TableCell>
                                            <TableCell sx={{fontSize:{sm:'1rem',lg:'1.2rem'},textTransform:'capitalize'}} align="left">{row.difficulty}</TableCell>
                                            <TableCell sx={{fontSize:{sm:'1rem',lg:'1.2rem'},textTransform:'capitalize'}} align="left">{row.played_at}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>

                })) :(<Box sx={{position:'absolute',top:"50%",left:"50%",transform:"translate(-50%,-50%)",textAlign:"center"}}>
                    <Typography variant="h4" sx={{marginBottom:"0.5rem"}}>Haven't yet Played!!</Typography>
                    <Link to="/home" style={{color:'black',textDecoration:'none'}} > <Button  variant="contained" size="large" > GO Play Quiz </Button></Link>
                </Box>)
            }
         {loading && <Loader loading={loading} />}   
        </Box>
    );
}

export default Scoreboard