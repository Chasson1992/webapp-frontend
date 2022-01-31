import React from "react";
import { Link } from "react-router-dom";
import './SidebarItem.css'

class SidebarItem extends React.Component {

    render() {
        return (
            <li className="SidebarItem"> 
                <Link to={this.props.to} className="SidebarLink">
                    {this.props.name}
                </Link>
            </li>
        );
    }
}

export default SidebarItem;