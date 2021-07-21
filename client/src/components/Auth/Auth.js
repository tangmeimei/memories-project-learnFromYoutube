import React, { useState } from 'react';
import { Container, Grid, Paper, Avatar, Typography, Button } from '@material-ui/core';
import useStyles from './styles';
import { LockOutlined } from '@material-ui/icons';
import Input from './input';
import { GoogleLogin } from 'react-google-login'
import Icon from './icon';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';
const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
};


export const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignUp) {
            dispatch(signup(form, history));
        } else {
            dispatch(signin(form, history));
        }
    }
    const handleChange = (e) => {

        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleShowPassword = () => setShowPassword(!showPassword)
    const switchMode = () => setIsSignUp(!isSignUp);
    const googleSucess = async (res) => {
        const reuslt = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({ type: 'AUTH', data: { reuslt, token } });
            history.push('/');
        } catch (error) {
            console.log(error);
        }

    }
    const googleFailure = () => alert('Google Sign in was unseccessful ,Try again later');

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlined />
                </Avatar>
                <Typography variant="h5" component="h1">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignUp && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} half autoFocus />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half autoFocus />
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                        <Button type="submit" fullWidth className={classes.submit} color="primary" variant="contained">{isSignUp ? 'Sign Up' : 'Sign In'}</Button>
                        <GoogleLogin
                            onSuccess={googleSucess}
                            onFailure={googleFailure}
                            cookiePolicy="single_host_origin"
                            clientId="9403478164-0i618eo89dqo7pdhe0721bsa75m2deeh.apps.googleusercontent.com"
                            render={(renderProps) => <Button
                                className={classes.googleButton}
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}
                            >Google Sign In</Button>}
                        />
                    </Grid>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>{isSignUp ? 'Already have an account ? Sign In' : "Don't have  an account? Sign Up"}</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}
