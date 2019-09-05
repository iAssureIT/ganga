import React 			   from 'react';
import ReactDOM            from 'react-dom';
import './index.css';
import App from './App.js';
import * as serviceWorker  from './serviceWorker';
// import {routes} from './lib/router.js';
import { Provider } 	from 'react-redux';
import { createStore } 	from 'redux';

import reducer 			from './store/reducer';


/*import './node_modules/font-awesome/css/font-awesome.min.css';
*/// import '../node_modules/owl.carousel/dist/assets/owl.carousel.css';
// import '../node_modules/owl.carousel/dist/assets/owl.theme.default.css';
// import OwlCarousel from 'react-owl-carousel';


 


// global.jQuery = require('jquery');

const store = createStore(reducer);


// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render( <Provider store={store}> <App /> </Provider>,  document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
