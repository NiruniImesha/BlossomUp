import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import React, { useState } from 'react'

const Navbar = () => {


  return (
    <div className="navbar">
        <div className="wrapper">
            <div className="search">
                <input type="text" placeholder="search..."/>
                <SearchOutlinedIcon/>
            </div>
            <div className="items">
                
            </div>
        </div>
    </div>

    
  )
}

export default Navbar