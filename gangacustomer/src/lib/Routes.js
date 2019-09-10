import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/modal.js';
import 'bootstrap/js/collapse.js';
import 'bootstrap/js/tab.js';
import 'font-awesome/css/font-awesome.min.css';
// import $ from 'jquery';

import '../App.css';
//-----------Main Menu Rout.................//
import Header         from '../common/Header/Header.js';
import Footer         from '../common/Footer/Footer.js';
import HomePage       from '../pages/HomePage/HomePage.js';

//-----------Syatem Security Rout.................//

import Login            from '../systemSecurity/Login.js';
import ConfirmOtp       from '../systemSecurity/ConfirmOtp.js'; 
import ForgotPassword   from '../systemSecurity/ForgotPassword.js';
import ResetPassword    from '../systemSecurity/ResetPassword.js';
import SignUp           from '../systemSecurity/SignUp.js';
import VerifyAccount    from '../systemSecurity/VerifyAccount.js';
import Cart             from '../pages/Cart/Cart.js';
import ViewOrder        from '../pages/MyOrders/ViewOrder.js'
// Order Tracking
import MyOrders    from '../pages/MyOrders/MyOrders.js';
import ShipmentTracking    from '../pages/ShipmentTracking/ShipmentTracking.js';
import ProductDetailsEcommerce    from '../pages/ProductDetailsEcommerce/ProductDetailsEcommerce.js';

const WebLayout = () => (
  <div className="skin-blue fixed sidebar-mini">    
    <Route path="/" exact strict component={ HomePage } /> 
    <Route path="/login"                    exact strict component={ Login } />
    <Route path="/signup"                   exact strict component={ SignUp } />
    <Route path="/forgot-pwd"               exact strict component={ ForgotPassword } />
    <Route path="/reset-pwd"                exact strict component={ ResetPassword } />
    <Route path="/verify-account"           exact strict component={ VerifyAccount } />
    <Route path="/confirm-otp/:user_ID"     exact strict component={ ConfirmOtp } />
    <Route path="/cart"                     exact strict component={ Cart } />
    <Route path="/MyOrders"                 exact strict component={ MyOrders } />
    <Route path="/ViewOrder"                exact strict component={ ViewOrder } />
    <Route path="/ShipmentTracking"         exact strict component={ ShipmentTracking } />
    <Route path="/ProductDetails/:productId"         exact strict component={ ProductDetailsEcommerce } />
  </div>
);


function Routes() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route path="/" component={ WebLayout } />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default Routes;