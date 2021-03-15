import './App.css';
import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Users from './pages/users';
import Repositories from './pages/repository';
import DropDown from './components/dropDown/DropDown';
import './styles/main.scss';

function App(props) {

  let githubClientId;
  let githubClientSecret;
  
  if (process.env.NODE_ENV !== 'production') {
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
  } else {
    githubClientId = process.env.GITHUB_CLIENT_ID;
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
  }
  
  useEffect(() => {
    console.log("userprofile " + JSON.stringify(props.userprofile));
  }, [])

  return (
    <div className="App">
        <Router>
          <DropDown dispatch={props.dispatch} keyword={props.searchKeyword} option={props.searchOption} error={props.error} />
        <Switch>
        <Route
                exact
                path="/"
                render={() => {
                    return (
                      props.searchOption ?
                      <Redirect to={props.searchOption} /> :
                      <Redirect to="/" /> 
                    )
                }}
              />
          <Route exact path="/users" >
              <Users githubClientId={githubClientId} githubClientSecret={githubClientSecret} dispatch={props.dispatch} userprofile={props.userprofile} keyword={props.searchKeyword} option={props.searchOption} loading={props.isLoading} error={props.error} />
          </Route>
          <Route exact path="/repository" >
              <Repositories githubClientId={githubClientId} githubClientSecret={githubClientSecret} dispatch={props.dispatch} repos={props.repos} keyword={props.searchKeyword} option={props.searchOption} loading={props.isLoading} error={props.error} />
          </Route>
        </Switch> 
         </Router>
    </div>
  
  );
}

const mapStateToProps = (state) => {
  return {
    userprofile: state.userprofile,
    repos: state.repos,
    searchKeyword: state.searchKeyword,
    searchOption: state.searchOption,
    isLoading: state.isLoading,
    error: state.error
  }
}

export default  connect(mapStateToProps)(App);
