import React, { useState, useEffect } from 'react';




const ScoreComp = (props) => {
    const [player, setPlayer] = useState('')

    useEffect(() => {
        setPlayer(props.playerInfo);
    }, [props.playerInfo]);

    return(
        <div className='container-fluid'>
            {player.name !== '' ? <h5>Player name: {player.name}</h5> : <h3>Something went wrong. Try again</h3>}
            {player.fantasyScore > 0 &&
                <div>
                    <h5>Fantasy score: {player.fantasyScore.toFixed(2)}</h5>
                    <h5>Score Per Game: {(player.fantasyScore/16).toFixed(2)}</h5>
                </div>
            }
            {player.pprScore > 0 &&
                <div>
                    <h5>PPR score: {player.pprScore.toFixed(2)}</h5>
                    <h5>Score Per Game: {(player.pprScore/16).toFixed(2)}</h5>
                </div>
            }
            {player.draftKingScore > 0 &&
                <div>
                    <h5>Draft King score: {player.draftKingScore.toFixed(2)}</h5>
                    <h5>Score Per Game: {(player.draftKingScore/16).toFixed(2)}</h5>
                </div>
            }
            {player.fanDuelScore > 0 &&
                <div>
                    <h5>Fan Duel score: {player.fanDuelScore.toFixed(2)}</h5>
                    <h5>Score Per Game: {(player.fanDuelScore/16).toFixed(2)}</h5>
                </div>
            }
        </div>
    )
}

export default ScoreComp;