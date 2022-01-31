import React from 'react';
import './Application.css';

class Application extends React.Component {
  render() {
    return (
      <div className="Application">
        {this.props.children}
      </div>
    );
  }
}

export default Application;
