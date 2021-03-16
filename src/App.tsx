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
import { useDispatch } from 'react-redux'


interface Item {
  dispatch: any,
  searchKeyword: string,
  searchOption: string,
  isLoading: boolean,
  userprofile: any,
  repos: any,
  error: any
}

function App({ dispatch, searchKeyword, searchOption, isLoading, userprofile, repos, error} : Item) {

  let githubClientId:string ;
  let githubClientSecret:string ;
  
  if (process.env.NODE_ENV !== 'production') {
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID!;
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET!;
  } else {
    githubClientId = process.env.GITHUB_CLIENT_ID!;
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET!;
  }
  
  useEffect(() => {
    console.log("userprofile " + JSON.stringify(userprofile));
  }, [])

  return (
    <div >
        <Router>
          <DropDown dispatch={dispatch} keyword={searchKeyword} option={searchOption} />
        <Switch>
        <Route
                exact
                path="/"
                render={() => {
                    return (
                      searchOption ?
                      <Redirect to={searchOption} /> :
                      <Redirect to="/" /> 
                    )
                }}
              />
          <Route exact path="/users" >
              <Users githubClientId={githubClientId} githubClientSecret={githubClientSecret} dispatch={dispatch} userprofile={userprofile} keyword={searchKeyword} option={searchOption} loading={isLoading} error={error} />
          </Route>
          <Route exact path="/repository" >
              <Repositories githubClientId={githubClientId} githubClientSecret={githubClientSecret} dispatch={dispatch} repos={repos} keyword={searchKeyword} option={searchOption} loading={isLoading} error={error} />
          </Route>
        </Switch> 
         </Router>
    </div>
  
  );
}

const mapStateToProps = (state: any) => {
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
