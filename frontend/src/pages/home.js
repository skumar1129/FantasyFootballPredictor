import React from 'react';
import hompage from '../assets/homepage.jpg';

const Home = () => {
    return(
        <div className='home'>
            <div className="jumbotron">
                <h1 className="display-4">Fantasy Football Predictor</h1>
                <p className="display-4">Pick a player and see their projected scores for fantasy</p>
                <img className="img-fluid" src={hompage} alt='' />
            </div>
        </div>  
    )
}

export default Home;