import React from 'react';
import './Sidebar.css'

class Sidebar extends React.Component {
    render() {
        return (
            <div className="Sidebar">
                <h1 className="SidebarHeaderText">
                    Bork!
                </h1>
                <div className="SiderbarDivider"/>
                {this.props.children}
            </div>
        );
    }
}

export default Sidebar;