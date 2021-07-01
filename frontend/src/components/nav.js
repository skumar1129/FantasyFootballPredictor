import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';


const NavBar = () => {
    return(
        <div className='nav'>     
            <Link to='/' className='mr-1'>Home</Link> |
            <Link to='/search' className='ml-1'>Search</Link>    
        </div>
    )
}

export default NavBar