
import React, { createContext, useReducer } from 'react';
import Home from "./client/HomePage/Home";
import About from "./client/AboutPage/About";
import Contact from "./client/ContactPage/Contact";
import Feedback from './client/Feedback/Feedback';
import Addlot from "./client/AddLot/Addlot";
import UpdateLot from "./client/UpdateLots/UpdateLot";
import Logout from "./client/Logout/Logout";
import Footer from './client/Footer/Footer';
import ProductDetails from "./client/ProductDetails/ProductDetails";
import Lot from "./client/LotPage/Lot";
import Profile from "./client/Profile/Profile";
import UpdateComponent from './client/UpdateLots/UpdateComponent';
import Signup from "./client/SignUp/Signup";
import BidStatus from './client/Bid Status/BidStatus';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Navbar from "./client/Navbar/Navbar";
import { Switch, Route, Redirect } from "react-router-dom";
import {initialState , reducer } from "./client/Reducer/UseReducer";
import 'font-awesome/css/font-awesome.min.css';
import 'font-awesome/css/font-awesome.min.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css';



import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

// CONTEXT API -> LOGOUT/LOGIN FUNCTIONALITY
export const UserContext = createContext();



const Routing = () => {
  return (

    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/addlot" component={Addlot} />
      <Route exact path="/updatelot" component={UpdateLot} />
      <Route exact path="/updateauction/:id" component={UpdateComponent} />

      <Route exact path="/lot" component={Lot} />
      <Route path="/lot/:keyword" component={Lot} />
      <Route exact path="/bidstatus" component={BidStatus} />
      <Route exact path="/about" component={About} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/feedback" component={Feedback} />

      <Route exact path="/profile" component={Profile} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/signin" component={Signup} />
      <Route exact path="/product/:id" component={ProductDetails} />

      <Redirect to="/" />
      {/* Can use Error 404 Page  but redirect is better than that page */}
    </Switch>

  )
}

const App = () => {


// PASSED STATE AND DISPATCHED AT EVERY ROOT
  const [state, dispatch] = useReducer(reducer , initialState);

 return (



    <>

      <UserContext.Provider value={{ state, dispatch }}>



        <Navbar />
        <Routing />
        <Footer />


      </UserContext.Provider>

    </>);
};

export default App;
