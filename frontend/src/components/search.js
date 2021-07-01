import React, { useEffect, useState } from 'react';
import { grabNames } from '../api/api_service';


const SearchComp = (props) => {
    const [names, setNames] = useState([]);
    
    useEffect(() => {
       grabNames().then((playerNames) => {
           setNames(playerNames)
        });
    }, []);
    
    const sendName = (event) => {
        props.sendName(event.target.value);   
    }

    return(
         <div className="form-group">
            <label className="label mr-1">Players</label>
            <select onChange={sendName}>
                <option></option>
            {names.map((value,index) => {
                return <option key={index}>{value}</option>
            })}
            </select>
        </div>
    )
}

export default SearchComp;