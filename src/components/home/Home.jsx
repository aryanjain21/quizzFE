import { Typography, Box } from '@mui/material';
import {  NavLink } from 'react-router-dom';

const style = {
   
    card: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: {
            xs:"300px",
            lg:"400px"
        },
        height: "200px",
        padding: "20px",
        // border: "1px solid black",
        borderRadius: "15px",
        background: "#FFCAB1",
    }

}

const Home = () => {

    return (
        <Box>
            <Typography align="center" gutterBottom={1} variant="h3" sx={{ marginTop: "2rem",fontSize:{xs:"1.8rem",lg:"2.5rem"} }}>Welcome To Quiz Master</Typography>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '70vh',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Typography sx={{ marginBottom: "1.5rem",fontSize:{xs:"1.5rem",lg:"2rem"} }} align="center" variant="h4" >Categories</Typography>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: "3rem",

                }}>

                    <Box sx={style.card} style={{background:'#AE70FA'}}>
                        <NavLink to="/rules?category=General-Knowledge" style={{ textDecoration: "none", listStyle: "none", color: 'black', fontSize:"1.8rem", letterSpacing: '0.2rem' }} >General Knowledge</NavLink>
                    </Box>
                    <Box sx={style.card} style={{background:'#69A2B0'}}>

                        <NavLink to="/rules?category=Computers" style={{ textDecoration: "none", listStyle: "none", color: 'black', fontSize: '1.8rem', letterSpacing: '0.2rem' }} > Computer Science</NavLink>
                    </Box>
                    <Box sx={style.card}>
                        <NavLink to="/rules?category=Books" style={{ textDecoration: "none", listStyle: "none", color: 'black', fontSize: '2rem', letterSpacing: '0.2rem' }} > Books</NavLink>
                    </Box>

                </Box>
            </Box>
        </Box>

    );
}

export default Home