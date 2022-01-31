import React from "react";
import { Route, Routes } from "react-router-dom";

class Chat extends React.Component {
    // Container for all the ChatArea routes that are linked to rooms/friends
    render() {
        return(
            <Routes>
                {this.props.children}
                <Route>
                    <Route path="*" element={<h1>There's nothing here. Why you puttin' in random url's anyway my guy</h1>} />
                </Route>
            </Routes>
        );
    }
}

export default Chat;