import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Redirect, Route, withRouter } from "react-router-dom";


const DropDown = (props) => {

    const [selectedOption, setSelectedOption] = useState('');
    const [searchString, setsearchString]= useState('');


  //  const searchStringDebounced = useDebounced(searchString);
    //  let searchStringDebounced = searchString;


    let { dispatch } = props;

    const setLoading = () => dispatch({ type: 'SET_LOADING' });

    const onHandleChange = (e) => {
        let { dispatch } = props;
        dispatch({ type: 'UPDATE_OPTION', searchOption: e.target.value })
        setSelectedOption(e.target.value)
        props.history.push(`/${e.target.value}`);
  
    }
    
    const onInputChange = (e) => {
        let { dispatch } = props;

        // searchStringDebounced

        dispatch({ type: 'UPDATE_KEYWORD', searchKeyword: e.target.value })
      
        setsearchString(e.target.value);
    }
  
    const token = '92e78fb8af455be1df1212314eb239d41e991ae6';


    useEffect(() => {
        let { dispatch } = props;        
     
     }, [selectedOption, searchString]);


    return (
        <div>
                <input type="text" defaultValue={props.keyword} onChange={onInputChange} />

              <select 
                  defaultValue={props.option}
                //   onChange={e => setSelectedOption(e.target.value)}
                onChange={onHandleChange}
              >
                  <option value="">Select</option>
                  <option value="users">Users</option>
                  <option value="repository">Repositories</option>
               </select>
        <hr />
        </div>
    )
}

export default withRouter(DropDown)
