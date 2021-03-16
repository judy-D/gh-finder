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
    userprofile: any,
    dispatch: any,
    keyword: any,
    option: string,
    loading: boolean,
    error: any
}

interface User {
    total_count: number;
    items: Array<string>;
    url: string;
    avatar_url: string;
    login: string;
  }
interface Err {
    message: string
}

const Users = ({ githubClientId, githubClientSecret, userprofile, dispatch, keyword, option, loading, error } : Item) => {
    const [users, setUsers] = useState<User[]>([]);
    const [errorMessage, setError] = useState<Err>({} as any);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);
    const ITEMS_PER_PAGE = 20;
    
        
      let isLoading;

      let debounced = useDebounced(keyword);

      const setLoading = () => dispatch({ type: 'SET_LOADING' });

      const token = '92e78fb8af455be1df1212314eb239d41e991ae6';

      const userSearch = async () => {     
      try {
        if (!hasNextPage) return;

        const searchUserURL = `https://api.github.com/search/users?q=${debounced}&client_id=${githubClientId}&client_secret=${githubClientSecret}&page=${page}&per_page=${ITEMS_PER_PAGE}`;
        await axios.get(searchUserURL,
            { 
                        headers: {
                         'Authorization':`token ${token}`,
                           }
                     }
            ).then(({ data: { items, total_count } }) => {
            if (items) {
                if (total_count === users.length + items.length) {
                    setHasNextPage(false);
                }
                isLoading = false;
                setUsers((users) => [...users, ...items]);
                dispatch({type: 'UPDATE_USERPROFILE', userprofile: items});
                // setUsers(userprofile);
                setPage(page => page + 1);
            }
        });
      }  catch(err) {
          isLoading = false;
          console.log("err" + JSON.stringify(err));
          setError(err);

      }
      
      }  


        const loadMoreData = () => {
            if (page > 1) {
                userSearch();
            }
        };

       
        useEffect(() => {
            if(debounced?.length >= 3 && option === "users") {
                userSearch();
                setLoading();
                isLoading = true;
            } else if(debounced?.length < 3) {
                // reset array to remove old search results
                users.splice(0, users.length);
                dispatch({ type: 'CLEAR_RESULT' })
            }
        
        }, [option, debounced])
    if(Object.entries(errorMessage).length !== 0) {
        return (
            <div style={{margin:'0 auto'}}>
                <h1>Error...The requested page {option} is not working now.</h1><br />
                <img src={ErrorImg} width="100" height="100" alt="" />
                <div>
                    {errorMessage.message}
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
    } 
    else if(keyword.length > 2)  {
        return (
            <div>
                <ul  className="card-list">
                        {users ? users.map((item: User, i: any) => {
                            return (
                                <li key={i} className="card" >
                                <Card token={token}  data={item} />
                                </li>
                            )
                        }): ''}
               </ul>
               {users.length != 0 ?  hasNextPage && (
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
                {/* <center><h2><b>No Results</b></h2></center> */}
            </div>
        )
    }
}

export default Users
