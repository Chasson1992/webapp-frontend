import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Application from './displays/application/Application';
import SignIn from './displays/signin/SignIn';
import SidebarItem from "./displays/application/components/SidebarItem";
import stompClient from '..';
import ChatArea from './displays/application/components/ChatArea';
import SidebarPill from './displays/application/components/SidebarPill';
import Sidebar from './displays/application/components/Sidebar';
import Chat from './displays/application/components/Chat'

class Builder {
    constructor () {
        // Avoid name collision
        // TODO: I think this will cause a memory leak due to circular reference
        this.self = this;

        this.self.routes = [];
        this.self.friendlinks = [];
        this.self.roomlinks = [];
    }

    initializeBork() {

        Promise.all(
            // Gather all dependencies from the server and wait for all to resolve
            [this.getUserFriends(),this.getUserRooms(),this.getSocketConnection()])
        .then( (promiseValues) => {
            this.self.buildNavigationItems(promiseValues[0], promiseValues[1]);
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


    buildNavigationItems(friends, rooms) {

        // Create the Friends nav links and attach the routes
        friends.forEach( (friend) => {

            this.self.routes.push(
                <Route
                    key={"friendroute=" + friend.id}
                    path={"friends/" + friend.id} 
                    element={
                        <ChatArea
                            roomId={friend.id}
                            key={friend.id} 
                            name={friend.firstName + " " + friend.lastName}
                        />    
                    }
                />
            );

            this.self.friendlinks.push(
                <SidebarItem
                    key={"friend=" + friend.id} 
                    to={"/app/friends/" + friend.id}
                    name={friend.firstName + " " + friend.lastName}
                />
            );
        });

        // Create the Rooms nav links and attach the routes
        rooms.forEach( (room) => {

            this.self.routes.push(
                <Route
                    key={"room=" + room.id} 
                    path={"rooms/" + room.id}
                    element={
                        <ChatArea
                            messages={room.messages}
                            roomId={room.id}
                            key={room.id}
                        />
                    }
                />
            )

            this.self.roomlinks.push(
                <SidebarItem
                    key={"room=" + room.id}
                    to={"/app/rooms/" + room.id} 
                    name={room.name}
                />
            );
        });
    }

    App() {
        return (
            <Route
                key="App"
                path="/app/*"
                element={
                    <Application>
                        <Sidebar>
                            <SidebarPill>
                                {this.self.friendlinks}
                                {this.self.roomlinks}
                            </SidebarPill>
                        </Sidebar>
                        <Chat>
                            {this.self.routes}
                        </Chat>
                    </Application>
                }
            />
        )
    }

    SignIn() {
        return (
            <Route
                key="SignIn"
                path="/signin"
                element={
                    <SignIn />
                }
            />
        )
    }

    Home() {
        return (
            <Route
                key="Home"
                path="/"
                element={
                    
                }
            />
        )
    }

    start() {
        // Render the application
        ReactDOM.render(
            <React.StrictMode>
                <BrowserRouter>
                    <Routes>
                        {this.self.Home()}
                        {this.self.SignIn()}
                        {this.self.App()}
                    </Routes>
                </BrowserRouter>
            </React.StrictMode>,
            document.getElementById('root')
        )
    }
}

export default Builder;