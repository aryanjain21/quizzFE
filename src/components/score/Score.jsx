import { Box, Button,Typography } from "@mui/material";
import { useLocation,  NavLink } from 'react-router-dom'



function useQuery() {
    return new URLSearchParams(useLocation().search);
}



const Score = () => {

    let query = useQuery();
    let category = query.get('category');
    let diffculty = query.get('difficulty')
    let score = query.get('score')




    return (
        <Box
            sx={{
               display:"flex",
               justifyContent:'center', 
               marginTop:"200px"
            }}
        >
            <Box
            sx={{
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                width:"300px",
                padding:"20px",
                border:"1px solid black",
                borderRadius:"10px"
            }}
            >
                <Typography variant="h3">Quiz Result</Typography>
                <Typography variant="h5" >Your Score</Typography>
                <Typography variant="h6" ><span style={{color:"hotpink"}}>{score}</span>/40</Typography>
                <Box
                sx={{
                    marginTop:"10px"
                }}
                >
                    <Button sx={{marginRight:"15px"}} variant="contained"><NavLink style={{textDecoration:'none',listStyle:'none',color:"white"}} to="/home">Go To Home</NavLink></Button>
                    <Button  variant="contained" ><NavLink style={{textDecoration:'none',listStyle:'none',color:"white"}} to={`/quiz?category=${category}&diffculty=${diffculty}`}>Play Again</NavLink></Button>
                    
                </Box>
            </Box>

        </Box>
    );
}

export default Score