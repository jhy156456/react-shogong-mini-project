import React, { useState } from "react";
import Header from "components/Header/Header.js";
// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
var hist = createBrowserHistory();

function App() {

  return (
    <div>
      {/* style={{ paddingLeft: 40, paddingRight: 40 }} */}
      <Router history={hist}>
        <Header
          brand="쇼핑을공장에서"
          rightLinks={<HeaderLinks />}
          fixed
          color="transparent"
          changeColorOnScroll={{
            height: 200,
            color: "white",
          }}
        />
        <Switch>
          <Route path="/landing-page" component={LandingPage} />
          <Route path="/store/:id" component={ProfilePage} />
          <Route
            path="/"
            render={() => <Components />}
          />
        </Switch>
      </Router>

      <Footer />
    </div>
  );
}

export default App;
