import React, {useState, useEffect} from 'react';
import {withRouter } from "react-router-dom";
import {RouteComponentProps} from "react-router";
import useDebounced from "../debounce/debounced";
import Logo from '../../img/github_logo.png';

interface Props extends RouteComponentProps<any>{
        dispatch: any,
        history: any,
        keyword: string,
        option: string
}

const DropDown = ({ dispatch, history, keyword, option } : Props)  => {

    const [selectedOption,
        setSelectedOption] = useState('');
    const [searchString,
        setsearchString] = useState('');


    const onHandleChange = (e : React.ChangeEvent<any>) => {
        dispatch({type: 'UPDATE_OPTION', searchOption: e.target.value})
        setSelectedOption(e.target.value)
            history
            .push(`/${e.target.value}`);

    }

    const onInputChange = (e: React.ChangeEvent<any>) => {
        dispatch({type: 'UPDATE_KEYWORD', searchKeyword: e.target.value})
        setsearchString(e.target.value);
    }

    let debounced = useDebounced(searchString);
    useEffect(() => {
        
    }, [selectedOption, searchString]);

    return (
        <div className={debounced.length >= 3 || keyword.length >= 3 ? "main-div result-dev" : "main-div center-div" }>
            <div className="main-wrap" style={{display:'flex',flexDirection:'column',justifyContent:'center'}} >
            <div className="inside-wrap" style={{display:'flex',flexDirection:'row'}}>
               <div style={{display:'inline-flex',justifyContent:'flex-start',marginBottom:'5px'}}>
               <div>
                    <img src={Logo} width="45" height="45" alt="" />
                </div>
                <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'baseline'}}>
                    <span  ><b>Github Searcher </b></span>
                    <span style={{color:'grey'}}>Search users or repositories below</span>
                </div>
               </div>
            </div>
            <div className="form-wrap" >
                <div style={{ display:'inline-flex'}}>
                <input type="text" data-test="searchInput" placeholder="Start typing to search .." defaultValue={keyword} onChange={onInputChange}/>
                {"  "}
                <select defaultValue={option} onChange={onHandleChange}>
                    <option value="">Select</option>
                    <option value="users">Users</option>
                    <option value="repository">Repositories</option>
                </select>
                </div>
            </div>
        </div>
        </div>
    )
}

export default withRouter(DropDown)
