import { Box, Typography } from "@mui/material"
import { NavLink } from "react-router-dom"





const Category = () => {

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop:"8rem",
            }}
        >
            <Typography variant="subtitle1" gutterBottom={3}>Choose Category To See World Leaderboard</Typography>
            <Box
                sx={{
                    width: "300px",
                    border: "1px solid black",
                    borderRadius: "5px",
                    fontSize: "2rem",
                    padding: "20px",
                    marginBottom: "1rem"
                }}
            >
                <NavLink style={{ textDecoration: 'none', listStyle: 'none', color: "black" }}  to="/world/scoreboard?category=Books"> Books </NavLink>
            </Box>



            <Box
                sx={{
                    width: "300px",
                    border: "1px solid black",
                    borderRadius: "5px",
                    fontSize: "2rem",
                    padding: "20px",
                    marginBottom: "1rem"
                }}
            >
                <NavLink style={{ textDecoration: 'none', listStyle: 'none', color: "black" }} to="/world/scoreboard?category=General-Knowledge">General Knowledge</NavLink>
            </Box>
            <Box
                sx={{
                    width: "300px",
                    border: "1px solid black",
                    borderRadius: "5px",
                    fontSize: "2rem",
                    padding: "20px",
                    marginBottom: "1rem"
                }}
            >
                <NavLink style={{ textDecoration: 'none', listStyle: 'none', color: "black" }} to="/world/scoreboard?category=Computers">  Computer Science</NavLink>
            </Box>


        </Box>
    )
}

export default Category