import React, { useContext } from 'react';
import ScoreComp from '../components/score';
import scorepage from '../assets/scorepage.jpg'
import { PlayerContext } from '../context/playerContext';


const Score = () => {
    const { player } = useContext(PlayerContext);

    


    return(
        <div className="scoring-page">
            <div className="jumbotron">
                <h3 className='display-4'>2020 Fantasy Projections</h3>
                <ScoreComp playerInfo={player} />
                <img className="img-fluid mb-2" src={scorepage} alt='' />
            </div> 
        </div>
    )
}

export default Score;