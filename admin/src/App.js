import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './coreAdmin/Layout/Layout.js';
import './App.css';

import axios from 'axios';

// axios.defaults.baseURL = 'http://qagangaexpressapi.iassureit.com';


// axios.defaults.baseURL = 'http://uatapi.gangaexpress.in';
axios.defaults.baseURL = 'http://localhost:3065';


axios.defaults.headers.post['Content-Type'] = 'application/json';

function App() {
  return (
    <div> 
      <Layout />
    </div>
    
    );
}

export default App;