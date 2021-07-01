import React, { useState, useContext } from 'react';
import searchpage from '../assets/searchpage.jpg';
import SearchComp from '../components/search';
import ScoreType from '../components/scoreType';
import { Link } from 'react-router-dom';
import { grabScore } from '../api/api_service';
import { PlayerContext } from '../context/playerContext';





const Search = () => {
    const [name, setName] = useState('');
    const [scoreType, setScoreType] = useState('');
    const { getFantasyScore, getPprScore, getDraftKingScore, getFanDuelScore, noResult } = useContext(PlayerContext);
    
    const grabName = (playerName) => {
        setName(playerName);
    }

    const grabType = (type) => {
        setScoreType(type);
    }

    const getPlayer = async () => {
        const playerData = await grabScore(name, scoreType);
        const data = playerData.data;
        if (data.fantasyScore) {
            await getFantasyScore(data);
        } else if (data.pprScore) {
            await getPprScore(data);
        } else if (data.draftKingScore) {
            await getDraftKingScore(data);
        } else if (data.fanDuelScore) {
            await getFanDuelScore(data);
        } else {
            await noResult();
        }
        
    }
    return(
        <div className='search-page'>
            <div className='jumbotron'>
                <form>
                    <h1 className="display-4 mb-2">Choose your player</h1>
                    <SearchComp sendName={grabName} />
                    <ScoreType sendType={grabType} />
                    <Link className="btn btn-primary" to='/score' onClick={getPlayer}>Submit</Link>
                </form>
                <img className='img-fluid mt-2' src={searchpage} alt='' />
            </div>
        </div>
       
    )
}

export default Search;