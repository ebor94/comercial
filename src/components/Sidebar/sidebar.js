import React from 'react';
import '../../assets/css/sidebar.css'
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            {/* <button className="close-btn" onClick={toggleSidebar}>
                
            </button> */}
            <br/>
            <ul>
                <li><Link to="/Home" onClick={toggleSidebar}>Home</Link></li>
                {/* <li><Link to="/invoice" onClick={toggleSidebar}>Invoice</Link></li> */}
            </ul>
        </div>
    );
};

export default Sidebar;