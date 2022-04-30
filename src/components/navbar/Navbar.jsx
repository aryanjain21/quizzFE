import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {NavLink,useHistory} from 'react-router-dom'
import {useAuth} from '../../context/AuthContext'


const Navbar = () => {
    
    const {user,userDispatch} = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const history = useHistory()
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = ()=>{
        userDispatch({type:'LOGOUT_SUCCESS'})
        localStorage.removeItem("quizMaster")
        history.push('/home')
    }

    const profileMenu = () => {
        return <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
            {/* <MenuItem onClick={handleClose}>Play As Guest</MenuItem> */}
            <NavLink style={{textDecoration:'none',listStyle:'none',color:"black"}} to="/select/category"><MenuItem onClick={handleClose}>World Ranking</MenuItem></NavLink>
            {!user.token && <NavLink style={{textDecoration:'none',listStyle:'none',color:"black"}} to="/signup"><MenuItem onClick={handleClose}>Signup</MenuItem></NavLink>}
            {!user.token && <NavLink style={{textDecoration:'none',listStyle:'none',color:"black"}} to="/login"><MenuItem onClick={handleClose}>Login</MenuItem></NavLink>}
            {user.token && <NavLink style={{textDecoration:'none',listStyle:'none',color:"black"}} to="/scoreboard"><MenuItem onClick={handleClose}>Scoreboard</MenuItem></NavLink>}
            {user.token && <MenuItem onClick={()=>{handleClose();logout()}}>Logout</MenuItem>}

        </Menu>
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="transparent">
                <Toolbar>
                    {/* <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1, fontWeight: 600,fontSize:{xs:"1.6rem",lg:"2.5rem"} }}>
                        <NavLink to="/home" style={{textDecoration:'none',listStyle:'none',color:"black",cursor:'pointer'}}>Quiz Master</NavLink>
                    </Typography>
                    <IconButton
                        color="inherit"
                        aria-label="menu"
                        onClick={handleClick}
                    >
                        <AccountCircleOutlinedIcon sx={{ fontSize: "2.3rem" }} />
                    </IconButton>

                </Toolbar>
            </AppBar>
            {open && profileMenu()}
        </Box>
    );
}

export default Navbar