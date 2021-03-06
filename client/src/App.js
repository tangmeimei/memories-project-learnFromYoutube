import React from 'react';
import { Container } from '@material-ui/core';
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './components/Home/Home';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Auth } from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
const App = () => {

    return (
        <BrowserRouter>
            <Container maxWidth="xl">
                <Navbar />
                <Switch>
                    <Route path="/" component={() => <Redirect to="/posts" />} exact />
                    <Route path="/posts" component={Home} exact />
                    <Route path="/posts/search" exact component={Home} />
                    <Route path="/posts/:id" exact component={PostDetails} />
                    <Route path="/auth" component={Auth} />
                </Switch>
            </Container>
        </BrowserRouter>

    )
}

export default  App