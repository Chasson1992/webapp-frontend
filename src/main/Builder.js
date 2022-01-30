import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Application from './Application';
import SignIn from '../signin/SignIn';
import SidebarItem from "./components/SidebarItem";
import stompClient from '..';

class Builder {
    constructor () {
        // Avoid name collision
        // TODO: I think this will cause a memory leak due to circular reference
        this.self = this;

        this.self.routes = [];
    }

    initializeBork() {

        Promise.all(
            // Gather all dependencies from the server and wait for all to resolve
            [this.getUserFriends(),this.getUserRooms(),this.getSocketConnection()])
        .then( (promiseValues) => {
            this.self.buildRoutes(promiseValues[0], promiseValues[1]);
        })
        .then( () => {
            // Launch the app
            this.self.start();
        })
        .catch( error => {
            console.log(error);
        });
    }

    getSocketConnection() {
        return new Promise( (resolve, reject) =>{
            stompClient.connect(
                // Headers 
                {},
                // Connect Callback
                function (frame) {
                    resolve(frame);
                },
                // Error Callback
                function (frame) {
                    reject(frame);
                }
            );
        })
    }

    async getUserFriends() {
        try {
            const reponse = await fetch("/api/users/search/online?online=true");
            const data = await reponse.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async getUserRooms() {
        try {
            const reponse = await fetch("/api/rooms");
            const data = await reponse.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }


    buildRoutes(friends, rooms) {

        friends.forEach( (friend) => {
            this.self.routes.push(
                <Route
                    key={"friend=" + friend.id}
                    path={"/bork/friends/" + friend.id} 
                    element={
                        <SidebarItem
                            roomId={friend.id}
                            key={friend.id} 
                            name={friend.firstName + " " + friend.lastName}
                        />    
                    }
                />
            )
        });

        rooms.forEach( (room) => {
            this.self.routes.push(
                <Route
                    key={"room=" + room.id} 
                    path={"/bork/rooms/" + room.id}
                    element={
                        <SidebarItem
                            roomId={room.id}
                            key={room.id} 
                            name={room.name}
                        />
                    }
                />
            )
        });
    }

    start() {

        // Render the application
        ReactDOM.render(
          <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignIn />}/>
                <Route path="/bork" element={<Application />}>
                    {this.self.routes}
                </Route>
            </Routes>
          </BrowserRouter>,
          document.getElementById('root')
        )
    }
}

export default Builder;