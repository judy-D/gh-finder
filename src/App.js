import './App.css';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
  useParams,
  Redirect,
  withRouter
} from "react-router-dom";
import Users from './pages/users';
import Repositories from './pages/repository';
import DropDown from './components/dropDown/DropDown';
import './styles/main.scss';

function App(props) {

  const history = useHistory();
  let { loading } = props;
  // console.log("loading " + loading);
  console.log("props " + JSON.stringify(props))

  console.log("props.userprofile " + JSON.stringify(props.userprofile))
  //  let { slug } = useParams();
// console.log("match" + props.match.params);

// const location = useLocation();

const pathname = window.location.pathname //returns the current url minus the domain name


  const [selectedOption, setSelectedOption] = useState('');
  const [searchString, setsearchString]= useState('');

  let githubClientId;
  let githubClientSecret;
  
  if (process.env.NODE_ENV !== 'production') {
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
  } else {
    githubClientId = process.env.GITHUB_CLIENT_ID;
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
  }

  // let githubClientId = process.env.GITHUB_CLIENT_ID;
  // let githubClientSecret = process.env.local.GITHUB_CLIENT_SECRET;


  const onHandleChange = (e) => {
      let { dispatch } = props;
      // dispatch({ type: 'UPDATE_USERNAME', username: e.target.value })
      // setsearchString(e.target.value);
      // console.log("searchString  " + searchString);

  }

  const onSearch = () => {
    let { dispatch } = props;
    let { username } = props;

    if(selectedOption == 'Users') {

      fetch(`https://api.github.com/search/users?q=${username}&client_id=${githubClientId}&client_secret=${githubClientSecret}`)
      .then(res => {
        return res.json();
      })
      .then(res => {
        dispatch({type: 'UPDATE_USERPROFILE', userprofile: res});
        props.history.push("/users")
      })
      // console.log("userprofile "+ JSON.stringify(userprofile))

    }  else if (selectedOption == 'Repositories')  {

      fetch(`https://api.github.com/search/repositories?q=${username}`)
      .then(res => {
        return res.json();
      })
      .then(res => {
        dispatch({ type:'UPDATE_REPOS', repos: res });

      })

    }
  }


  const onUserSearch = () => {
    let { dispatch } = props;
    let { username } = props;
    fetch(`https://api.github.com/search/users?q=${username}`)
      .then(res => {
        return res.json();
      })
      .then(res => {
        dispatch({type: 'UPDATE_USERPROFILE', userprofile: res})
      })
  }

  const onReposSearch = () => {
    let { dispatch } = props;
    let { username } = props;
    fetch(`https://api.github.com/search/repositories?q=${username}`)
      .then(res => {
        return res.json();
      })
      .then(res => {
        dispatch({ type:'UPDATE_REPOS', repos: res })
      })
  }

  let { userprofile, repos } = props;

  useEffect(() => {
       let { dispatch } = props;

      //  console.log('effect app ' + githubClientId)
      //  console.log("loading " + props.isLoading)
      //  console.log(selectedOption);
      //  console.log("pathname " + pathname);
      //  console.log("match.params 1 " + JSON.stringify(props.location));

        console.log("searchOption "+ props.error);
       if(selectedOption == 'Users' && searchString.length > 2) {

        // props.history.push("/users");
        fetch(`https://api.github.com/search/users?q=${searchString}&client_id=${githubClientId}&client_secret=${githubClientSecret}`)
        .then(res => {
          return res.json();
        })
        .then(res => {
          dispatch({type: 'UPDATE_USERPROFILE', userprofile: res});
        })
         console.log("userprofile "+ JSON.stringify(userprofile))
      } else if (selectedOption == 'Repositories' && searchString.length > 2)  {
        // <Redirect to="/repository" />
        props.history.push("/repository")

        fetch(`https://api.github.com/search/repositories?q=${searchString}&client_id=${githubClientId}&client_secret=${githubClientSecret}`)
        .then(res => {
          return res.json();
        })
        .then(res => {
          dispatch({ type:'UPDATE_REPOS', repos: res });
        })
  
      } else if(searchString.length <= 2) {
        return (
          <div>No Search Results</div>
        );
      }

      // if(Object.entries(repos).length === 0) {
      //   console.log('repos are empty '+  typeof repos);
      // } else {
      //   console.log(repos + " " +  typeof repos)
      // }
    }, [selectedOption, searchString])

  
   

  return (
    <div className="App">
        <Router>
          <DropDown dispatch={props.dispatch} keyword={props.searchKeyword} option={props.searchOption} error={props.error} />
        <Switch>
          <Route exact path="/users" >
              <Users dispatch={props.dispatch} userprofile={props.userprofile} keyword={props.searchKeyword} option={props.searchOption} loading={props.isLoading} error={props.error} />
          </Route>
          <Route path="/repository" >
              <Repositories dispatch={props.dispatch} repos={props.repos} keyword={props.searchKeyword} option={props.searchOption} loading={props.isLoading} error={props.error} />
          </Route>
        </Switch> 
         </Router>
    </div>
  
  );
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
    userprofile: state.userprofile,
    repos: state.repos,
    searchKeyword: state.searchKeyword,
    searchOption: state.searchOption,
    isLoading: state.isLoading,
    error: state.error
  }
}

export default  connect(mapStateToProps)(App);
