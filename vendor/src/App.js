import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import swal   from 'sweetalert';
import Layout from './coreAdmin/Layout/Layout.js';
import './App.css';

import axios from 'axios';

axios.defaults.baseURL = 'http://qaapi.gangaexpress.in';

// axios.defaults.baseURL = 'http://localhost:3000';


axios.defaults.headers.post['Content-Type'] = 'application/json';

function App() {
  return (
    <div>
      <Layout />
    </div>
    
    );
}

export default App;