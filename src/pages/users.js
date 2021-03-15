import React, { useState, useEffect } from 'react';
import Card from '../components/card/card';
import { Waypoint } from "react-waypoint";
import  useDebounced  from '../components/debounce/debounced';
import axios from 'axios';

const Users = ({ githubClientId, githubClientSecret, userprofile, dispatch, keyword, option, loading, error }) => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);
    const ITEMS_PER_PAGE = 20;
    
      let isLoading;

      let debounced = useDebounced(keyword);

      const setLoading = () => dispatch({ type: 'SET_LOADING' });

      const token = '92e78fb8af455be1df1212314eb239d41e991ae6';

      const userSearch = async () => {     
        
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
                setUsers(users => [...users, ...items]);
                dispatch({type: 'UPDATE_USERPROFILE', userprofile: items});
                setPage(page => page + 1);
            }
        });
      }  

      console.log('users '+ JSON.stringify(users));
      console.log('userprofile useres '+  JSON.stringify(userprofile))

        const loadMoreData = () => {
            if (page > 1) {
                userSearch();
            }
        };

       
        useEffect(() => {
            if(debounced.length >= 3 && option === "users") {
                userSearch();
                setLoading();
                isLoading = true;
            } else if(debounced.length < 3) {
                // reset array to remove old search results
                users.splice(0, users.length);
                dispatch({ type: 'CLEAR_RESULT' })
            }
        
        }, [option, debounced])
    if(error) {
        return (
            <div>
                <center><h1>Error</h1></center><br />
                <div>
                    {error.message}
                </div><br />
                {JSON.stringify(error)}
            </div>
        )
    }
    else if(loading) {
        return (
            <div>
                <h1><b><center>Loading...</center></b></h1>
            </div>
        )
    } 
    else if(keyword.length > 2)  {
        return (
            <div>
                <ul  className="card-list">
                        {users ? users.map((item, i) => {
                            return (
                                <li key={i} className="card" >
                                <Card   data={item} />
                                </li>
                            )
                        }): ''}
               </ul>
               {users.length != 0 ?  hasNextPage && (
                        <Waypoint onEnter={loadMoreData}>
                            <h2 >
                                Loading data{" "}
                                {/* <FontAwesomeIcon icon="spinner" spin={true} /> */}
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
