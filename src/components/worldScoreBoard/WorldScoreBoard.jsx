import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Paper, Typography } from '@mui/material';
import { getWorldScoreBoard } from '../api'
import { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom'
import Loader from '../loader/Loader'
import toast from 'react-hot-toast'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}


const WorldScoreBoard = () => {
    const query = useQuery();
    let category = query.get('category');
    const [scoreCard, setScoreCard] = useState([]);
    const [loading, setLoading] = useState(false)

    const getWorldScoreCard = async () => {
        try {
            setLoading(true)
            const res = await getWorldScoreBoard({category:category});
            setScoreCard(res.data.data)
            setLoading(false)

        } catch (error) {
            setLoading(false)
            toast.error('Something went wrong!')
        }
    }

    useEffect(() => {
        getWorldScoreCard()
        // eslint-disable-next-line
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
            <Typography variant="h3" align="center" >{category}</Typography>
            {
                scoreCard && scoreCard.length > 0 && scoreCard.map(score => {
                    return <Box>
                        <Typography variant="h5" gutterBottom={2}>Level:<span style={{textTransform:"capitalize"}} >{score.level}</span></Typography>
                        <TableContainer   sx={{marginBottom:"1rem",width:{lg:"800px"} }} component={Paper}>
                            <Table sx={{width:{lg:"800px"}}} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{fontSize:{sm:'1rem',lg:'1.2rem'}}}>No</TableCell>
                                        <TableCell sx={{fontSize:{sm:'1rem',lg:'1.2rem'}}} align="left">Name</TableCell>
                                        <TableCell sx={{fontSize:{sm:'1rem',lg:'1.2rem'}}} align="left">Score</TableCell>
                                        <TableCell sx={{fontSize:{sm:'1rem',lg:'1.2rem'}}} align="left">Difficulty</TableCell>
                                        {/* <TableCell sx={{fontSize:{sm:'1rem',lg:'1.2rem'}}} align="left">Played At</TableCell> */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {score.scorecard.map((row, index) => (
                                        <TableRow
                                            key={index + 1}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell sx={{fontSize:{sm:'1rem',lg:'1.2rem'}}} component="th" scope="row">
                                                {index + 1}
                                            
                                            </TableCell>
                                            <TableCell sx={{fontSize:{sm:'1rem',lg:'1.2rem'},textTransform:'capitalize',whiteSpace: "nowrap",overflow:"hidden",textOverflow:'ellipsis',width:{sm:"5px"}}} align="left">{row.name}</TableCell>
                                            <TableCell sx={{fontSize:{sm:'1rem',lg:'1.2rem'},textTransform:'capitalize'}} align="left">{row.score}</TableCell>
                                            
                                            <TableCell sx={{fontSize:{sm:'1rem',lg:'1.2rem'},textTransform:'capitalize'}} align="left">{row.difficulty}</TableCell>
                                            {/* <TableCell sx={{fontSize:{sm:'1rem',lg:'1.2rem'},textTransform:'capitalize'}} align="left">{row.played_at}</TableCell> */}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>

                })
            }
            {loading && <Loader loading={loading} />}   
        </Box>
    );
}

export default WorldScoreBoard