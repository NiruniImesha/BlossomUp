import React from 'react'
import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="top">
                <Link to="/employee-manage" />
                <span className="logo">BlossomUp</span>
            </div>
            <hr />
            <div className="center">

            <p className='title'>Image Identification</p>
                <ul>
                   
                    <Link to={"/Identification-Result"} style={{ textDecoration: "none" }}>
                        <li>
                            <DashboardIcon className='icon' />

                            <span>Identification Dashboard</span>

                        </li>
                    </Link>

                </ul>
            </div>
            <div className="bottom">

            </div>
        </div>
    );
};

export default Sidebar