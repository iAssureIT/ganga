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
import Checkout             from '../pages/Checkout/Checkout.js';
import ViewOrder        from '../pages/MyOrders/ViewOrder.js'
import Edituser from '../pages/Edituser/Edituser.js';
import MyOrders    from '../pages/MyOrders/MyOrders.js';
import ShipmentTracking    from '../pages/ShipmentTracking/ShipmentTracking.js';
import ProductDetailsEcommerce    from '../pages/ProductDetailsEcommerce/ProductDetailsEcommerce.js';
import SearchProduct    from '../pages/ProductCollage/SearchProductPage.js';
import ProductCollage    from '../pages/ProductCollage/ProductCollage.js';
import GroceryProductCollage    from '../pages/ProductCollage/GroceryProductCollage.js';
import Payment    from '../pages/Payment/Payment.js';
import Wishlist    from '../pages/Wishlist/Wishlist.js';
import Account    from '../pages/Account/Account.js';
import EditAccount    from '../pages/EditAccount/EditAccount.js';
import Address    from '../pages/Address/Address.js';
import ReturnPolicy    from '../pages/ReturnPolicy/ReturnPolicy.js';


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
    <Route path="/checkout"                 exact strict component={ Checkout } />
    <Route path="/my-orders"                exact strict component={ MyOrders } />
    <Route path="/view-order/:order_ID"                exact strict component={ ViewOrder } />
    <Route path="/shipment-tracking"        exact strict component={ ShipmentTracking } />
    <Route path="/productdetails/:productID"             exact strict component={ ProductDetailsEcommerce } />
    <Route path="/searchProducts"           exact strict component={ SearchProduct } />
    <Route path="/product-collage/:categoryID"            exact strict component={ ProductCollage } />
    <Route path="/product-collage/:categoryID/:subcategoryID"   exact strict component={ ProductCollage } />
    <Route path="/GroceryProductCollage"            exact strict component={ GroceryProductCollage } />
    <Route path="/profile"            exact strict component={ Edituser } />
    <Route path="/payment/:order_ID"            exact strict component={ Payment } />
    <Route path="/wishlist"            exact strict component={ Wishlist } />
    <Route path="/account"            exact strict component={ Account } />
    <Route path="/edit"            exact strict component={ EditAccount } />
    <Route path="/address"            exact strict component={ Address } />
    <Route path="/returnpolicy"            exact strict component={ ReturnPolicy } />
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