import React              from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import Layout from "./Layout/Layout.js";
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
	   <Layout />
    </div>
  );
}
export default App;
