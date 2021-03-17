import React, { useState, useEffect } from 'react';
import Card from '../components/card/card';
import { Waypoint } from "react-waypoint";
import  useDebounced  from '../components/debounce/debounced';
import axios from 'axios';
import Loader from '../components/loader/loader';
import ErrorImg from '../img/Octocat.png';


interface Item {
    githubClientId: string,
    githubClientSecret: string,
    repos: any,
    dispatch: any,
    keyword: any,
    option: string,
    loading: boolean,
    error: any
}

interface Err {
    message: string
}

const Repositories = ({ githubClientId, githubClientSecret, repos, dispatch, keyword, option, loading, error }: Item) => {
    const [repositories, setRepositories] = useState([] as any);
    const [errorMessage, setError] = useState<Err>({} as any);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);
    const ITEMS_PER_PAGE = 20;
  
      // eslint-disable-next-line    
      let isLoading;
  
      let debounced = useDebounced(keyword);

      const setLoading = () => dispatch({ type: 'SET_LOADING' });
      const token = '3f99d7bf4d4a26bb2efcb65d5c2ac9184f180be6';
      const repoSearch = async () => {     
        try {
            if (!hasNextPage) return;

            const searchUserURL = `https://api.github.com/search/repositories?q=${debounced}&client_id=${githubClientId}&client_secret=${githubClientSecret}&page=${page}&per_page=${ITEMS_PER_PAGE}`;
            await axios.get(searchUserURL,
                { 
                            headers: {
                             'Authorization':`token ${token}`,
                               }
                         }
                ).then(({ data: { items, total_count } }) => {
                if (items) {
                    if (total_count === repositories.length + items.length) {
                        setHasNextPage(false);
                    }
                    // eslint-disable-next-line
                    isLoading = false;
                    setRepositories((repositories: any) => [...repositories, ...items]);
                    dispatch({type: 'UPDATE_REPOS', repos: items});
    
                    setPage(page => page + 1);
                }
            });
        }  catch(err) {
            // isLoading = false;
            console.log("err" + JSON.stringify(err));
            setError(err);
        }
      
      }
      useEffect(() => {
        if(debounced.length >= 3 && option === "repository") {
            repoSearch();
            setLoading();
        } else if(debounced.length < 3) {
            // reset array to remove old search results
            repositories.splice(0, repositories.length);
            dispatch({ type: 'CLEAR_RESULT' })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [option, debounced])  
      const loadMoreData = () => {
        if (page > 1) {
            repoSearch();
        }
    };

    if(error || Object.entries(errorMessage).length !== 0) {
        return (
            <div style={{margin:'0 auto'}}>
            <h1>Error...The requested page {option} is not working now.</h1><br />
            <img src={ErrorImg} width="100" height="100" alt="" />
            <div>
                {errorMessage.message || error.message}
            </div><br />
        </div>
        )
    } 
    else if(loading) {
        return (
            <div>
                <Loader />
            </div>
        )
    } else if(keyword.length > 2){
        return (
            <div>
                <ul  className="card-list">
               {repositories ? repos.map((item: any, i: any) => {
                   return (
                    <li key={i} className="card" >
                       <Card token={token} data={item} />
                    </li>
                   )
               }): ''}
               </ul>
               {repositories.length !== 0 ?  hasNextPage && (
                        <Waypoint onEnter={loadMoreData}>
                            <h2 >
                                Loading data{" "} 
                                <Loader />
                            </h2>
                        </Waypoint>
                    ):''}
            </div>
        )
    } else {
        return (
            <div>
                {" "}
            </div>
        )
    }
}

export default Repositories
