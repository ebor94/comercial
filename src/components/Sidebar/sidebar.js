import React from 'react';
import '../../assets/css/sidebar.css'
import { Link } from 'react-router-dom';
import { GoHome } from "react-icons/go";
import { IoCartOutline } from "react-icons/io5";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            {/* <button className="close-btn" onClick={toggleSidebar}>
                
            </button> */}
            <br/>
            <ul>
                <li><Link to="/Home" onClick={toggleSidebar}><GoHome style={{fontSize: '24px' }} /> Home</Link></li>
                <li><Link to="/listQuote" onClick={toggleSidebar}> <IoCartOutline  style={{fontSize: '24px' }}/>Gestion Proformas</Link></li>
                {/* <li><Link to="/invoice" onClick={toggleSidebar}>Invoice</Link></li> */}
            </ul>
        </div>
    );
};

export default Sidebar;