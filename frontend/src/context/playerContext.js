import React, { createContext, useReducer } from 'react';
import AppReducer from '../AppReducer';

const initialState = {
    name: '',
    fantasyScore: 0,
    pprScore: 0,
    draftKingScore: 0,
    fanDuelScore: 0
}

export const PlayerContext = createContext(initialState);

export const PlayerProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    async function getFantasyScore(player) {
        await dispatch({
            type: 'Fantasy_Score',
            payload: player
        });
    }

    async function getPprScore(player) {
        await dispatch({
            type: 'PPR_Score',
            payload: player
        });
    }

    async function getDraftKingScore(player) {
        await dispatch({
            type: 'DraftKing_Score',
            payload: player
        });
    }

    async function getFanDuelScore(player) {
        await dispatch({
            type: 'FanDuel_Score',
            payload: player
        });
    }

    async function noResult() {  
        await dispatch({
            type: 'Default',
            payload: undefined
        });
    }

    return (
        <PlayerContext.Provider
        value={
            {
                player: state, 
                getFantasyScore, 
                getPprScore, 
                getDraftKingScore,
                getFanDuelScore,
                noResult
            }
        }>
            {children}
        </PlayerContext.Provider>
    )
}