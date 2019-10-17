import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Auth from "./components/Auth"
import DashBoard from "./components/Dashboard"
import Form from "./components/Form"
import Post from "./components/Post"

export default (
    <Switch>
        <Route path ="/" component ={Auth}/>
        <Route path ="/dash" component ={DashBoard}/>
        <Route path = "/post/:postid" component ={Post}/>
        <Route path = "/new" component ={Form}/>
    </Switch>
)