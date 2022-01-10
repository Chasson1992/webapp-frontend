import React from 'react';
import Users from './Users';

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    checkForUsers = () => {
        fetch("/api/users")
            .then(reponse => reponse.json())
            .then(data => {
                this.setState({users: data});
            });
    }

    componentDidMount = () => {
        this.checkForUsers();

        setInterval(this.checkForUsers, 1000);
    }

    render() {
        let userList=[];
        this.state.users.forEach((user,index) =>(
            userList.push(<Users key={index} firstName={user.firstName} lastName={user.lastName}/>)
        ));

        console.log(userList);
    
        return (
            <div>
                <h1>Users:</h1>
                <ul>{userList}</ul>
            </div>
        );
    }
}

export default UserList;