import React from "react";
import PropTypes from "prop-types";
import './SidebarItem.css'

class SidebarItem extends React.Component {

    // Type checks
    static propTypes = {
        roomId: PropTypes.string,
        name: PropTypes.string,
        profilePicutre: PropTypes.object,
        selectionHandler: PropTypes.func
    }

    render() {
        return (
            <li className="SidebarItem" onClick={()=>this.props.selectionHandler(this.props.roomId)}>
                {this.props.name}
            </li>
        );
    }
}

export default SidebarItem;