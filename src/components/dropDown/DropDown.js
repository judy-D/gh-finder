import React, {useState, useEffect} from 'react';
import {withRouter} from "react-router-dom";

const DropDown = (props) => {

    const [selectedOption,
        setSelectedOption] = useState('');
    const [searchString,
        setsearchString] = useState('');

    let {dispatch} = props;

    const onHandleChange = (e) => {
        dispatch({type: 'UPDATE_OPTION', searchOption: e.target.value})
        setSelectedOption(e.target.value)
        props
            .history
            .push(`/${e.target.value}`);

    }

    const onInputChange = (e) => {
        dispatch({type: 'UPDATE_KEYWORD', searchKeyword: e.target.value})
        setsearchString(e.target.value);
    }

    useEffect(() => {}, [selectedOption, searchString]);

    return (
        <div>
            <input type="text" defaultValue={props.keyword} onChange={onInputChange}/>
            <select defaultValue={props.option} onChange={onHandleChange}>
                {/* <option value="">Select</option> */}
                <option value="users">Users</option>
                <option value="repository">Repositories</option>
            </select>
            <hr/>
        </div>
    )
}

export default withRouter(DropDown)
