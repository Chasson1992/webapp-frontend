import React from "react";
import PropTypes from "prop-types";
import './SidebarItem.css'

class SidebarItem extends React.Component {

    // Type checks
    static propTypes = {
        name: PropTypes.string,
        profilePicutre: PropTypes.object
    }

    render() {
        return (
            <li className="SidebarItem">
                {this.props.name}
            </li>
        );
    }
}

export default SidebarItem;