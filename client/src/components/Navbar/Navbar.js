import React, { useState, useEffect } from 'react'
import { AppBar, Typography, Toolbar, Button, Avatar } from '@material-ui/core';
import useStyles from './styles';
import memoriesText from '../../images/memories-Text.png';
import memoriesLogo from '../../images/memories-Logo.png';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import decode from 'jwt-decode';
export const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        setUser(null);
        history.push('/');
    }

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodeToken = decode(token);
            if (decodeToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link className={classes.brandContainer} to="/">
                <img src={memoriesText} component={Link} to="/" alt="memories" height="45px" />
                <img className={classes.image} src={memoriesLogo} alt="memories" height="40px" />
            </Link>
            <Toolbar>
                {user?.reuslt ? (<div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user?.reuslt.name} src={user?.reuslt.imageUrl}>{user?.reuslt.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant="h6">{user?.reuslt.name}</Typography>
                    <Button className={classes.logout} ariant="contained" color="secondary" onClick={logout}>Logout</Button>
                </div>) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}
