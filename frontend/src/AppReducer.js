const reducer = (state, action) => {
    const player = action.payload;
    switch (action.type) {
        case 'Fantasy_Score':
            state = {
                name: player.name,
                fantasyScore: player.fantasyScore,
                pprScore: 0,
                draftKingScore: 0,
                fanDuelScore: 0
            }
            return state;
        case 'PPR_Score':
            state = {
                name: player.name,
                pprScore: player.pprScore,
                fantasyScore: 0,
                draftKingScore: 0,
                fanDuelScore: 0
            }
            return state;
        case 'DraftKing_Score':
            state = {
                name: player.name,
                draftKingScore: player.draftKingScore,
                fantasyScore: 0,
                pprScore: 0,
                fanDuelScore: 0
            }
            return state;
        case 'FanDuel_Score':
            state = {
                name: player.name,
                fanDuelScore: player.fanDuelScore,
                fantasyScore: 0,
                pprScore: 0,
                draftKingScore: 0,
            }
            return state;
        default:
            return state;
    }
};

export default reducer;