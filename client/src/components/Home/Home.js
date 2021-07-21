import React, { useEffect, useState } from 'react'
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getPosts, getPostsBySearch } from '../../actions/posts';
import Pagination from '../Pagination';
import useStyles from './styles';
import ChipInput from 'material-ui-chip-input';
import { useLocation, useHistory } from 'react-router-dom';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}
export const Home = () => {
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null);
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const classes = useStyles();
    const history = useHistory();
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    /*     useEffect(() => {
            dispatch(getPosts());
    
        }, [currentId, dispatch]) */

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost();
        }

    }


    const handleAddChip = (tag) => setTags([...tags, tag]);

    const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({ search: search, tags: tags.join(',') }));
            history.push(`/posts/homepage/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            history.push('/');
        }
    }

    return (
        <Grow in>
            <Container maxWidth='xl'>
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar position="static" color="inherit" className={classes.appBarSearch}>
                            <TextField
                                name="search"
                                label="Search Memories"
                                fullWidth
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                variant="outlined"
                                onKeyDown={handleKeyPress}
                            />
                            <ChipInput
                                style={{ margin: '10px 0' }}
                                value={tags}
                                onAdd={(chip) => handleAddChip(chip)}
                                onDelete={(chip) => handleDeleteChip(chip)}
                                label="Search Tags"
                                variant="outlined"
                            />
                            <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                        </AppBar>

                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        <Paper elevation={6} className={classes.pagination}>
                            <Pagination page={page} />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}
