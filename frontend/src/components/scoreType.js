import React from 'react';

const ScoreType = (props) => {
    const sendType = (event) => {
        props.sendType(event.target.value);
    }

    return(
        <div className="form-group">
        <label className="label mr-1">Score Type</label>
        <select onChange={sendType}>
            <option></option>
            <option>Fantasy Score</option>
            <option>PPR Score</option>
            <option>Draft Kings Score</option>
            <option>Fan Duel Score</option>
        </select>
    </div>   
    )
}

export default ScoreType;