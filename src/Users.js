import React from 'react';
import PropTypes from "prop-types";

class Users extends React.Component {
    static propTypes = {
        firstName: PropTypes.string,
        lastName: PropTypes.string
    }

    render() {
        console.log(this.props);
        return(
            <p>{this.props.firstName} {this.props.lastName}</p>
        );
    }
}

export default Users;