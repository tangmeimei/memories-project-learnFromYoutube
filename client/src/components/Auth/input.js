import React from 'react';
import { Grid, TextField, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

export const Input = ({ half, label, name, handleChange, autoFocus, type, handleShowPassword }) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField
                label={label}
                name={name}
                onChange={handleChange}
                required
                variant="outlined"
                autoFocus={autoFocus}
                type={type}
                fullWidth
                InputProps={name === 'password' ? {
                    endAdornment: (
                        <InputAdornment>
                            <IconButton onClick={handleShowPassword}>
                                {type === 'password' ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    )
                } : null}
            />
        </Grid>
    )
}

export default Input;
