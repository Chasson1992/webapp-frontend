import React from 'react';
import './SidebarPill.css'

class SidebarPill extends React.Component {
    render() {
        return (
            <div className="SidebarPill">
                <div className="SiderbarPillHeaderText">Users</div>
                    {this.props.children[0]}
                <div className="SiderbarPillDivider"/>
                <div className="SiderbarPillHeaderText">Rooms</div>
                    {this.props.children[1]}
            </div>
        );
    }
}

export default SidebarPill;
