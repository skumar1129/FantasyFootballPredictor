import axios from 'axios';
import db from '../index';
import API_URL from './config';

const headers = {
    'Content-Type': 'application/json',
}

export const grabNames = async () => {
    let data = [];
    const snapshot = await db.collection('players').get();
    snapshot.forEach((doc) => data.push(doc.id));
    return data;
}

export const grabPlayer = (player) => {
    return axios.get(`http://127.0.0.1:5000/player/${player}`).catch(err => {
        throw new Error(`Player error ${err}`)
    });
}

const formatPosition = (postBody) => {
    switch (postBody.position) {
        case 'RB':
            postBody.QB = 0;
            postBody.WR = 0;
            postBody.TE = 0;
            postBody.RB = 1;
            break;        
        case 'TE':
            postBody.QB = 0;
            postBody.WR = 0;
            postBody.TE = 1;
            postBody.RB = 0; 
            break;
        case 'QB':
            postBody.QB = 1;
            postBody.WR = 0;
            postBody.TE = 0;
            postBody.RB = 0;
            break;
        case 'WR':
            postBody.QB = 0;
            postBody.WR = 1;
            postBody.TE = 0;
            postBody.RB = 0;
            break;
        default:
            break;
    }
    delete postBody.position;
    return postBody;
}

const getScoreUrl = (type) => {
    let url = '';
    switch (type) {
        case 'Fantasy Score':     
            url = `${API_URL}/fantasyscore`;
            break;
        case 'PPR Score':
            url = `${API_URL}/pprscore`;
            break;
        case 'Draft Kings Score':
            url = `${API_URL}/draftkingscore`;
            break;
        case 'Fan Duel Score':
            url = `${API_URL}/fanduelscore`;
            break;
        default:
            break;
    }
    return url;
}

export const grabScore = async (player, type) => {
    const playerRef = db.collection('players').doc(player);
    const data = await playerRef.get();
    let {teamName, ...postBody} = data.data()
    postBody = formatPosition(postBody);
    const postUrl = getScoreUrl(type);
    return axios.post(postUrl, postBody, {
        headers: headers
    }).catch(err => {
        throw new Error(`Score error ${err}`)
    });
}
