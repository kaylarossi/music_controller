import React, {Component} from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import {BrowserRouter as Router, Routes, Route, Link, Redirect} from "react-router-dom";

export default class HomePage extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
        <Router>
            <Routes>
                <Route exact path ="/"
                    element={<h1>This is the homepage</h1>} />
                <Route path='/join' element={<RoomJoinPage />} />
                <Route path='/create' element={<CreateRoomPage />} />
            </Routes>
        </Router>
    );
    }
}
