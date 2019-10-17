import React from 'react';
import logo from './logo.svg';
import './App.css';
import Auth from "./components/Auth"
import DashBoard from "./components/Dashboard"
import Form from "./components/Form"
import Post from "./components/Post"
import Nav from "./components/Nav"
import routes from './routes'

function App() {
  return (
    <div className="App">
      <Nav/>
      {routes}
    </div>
  );
}

export default App;
