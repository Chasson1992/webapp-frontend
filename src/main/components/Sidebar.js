import React from "react";
import PropTypes from "prop-types";
import './Sidebar.css'
import SidebarPill from "./SidebarPill";

class Sidebar extends React.Component {


    render() {
        return (
            <div className="Sidebar">
                <h1 className="SidebarHeaderText">
                    Bork!
                </h1>
                <SidebarPill/>
            </div >
        );
    }
}

export default Sidebar;