import React, { useEffect } from "react";
import Header from "components/Header/Header.js";
// pages for this product
import Components from "views/Components/Components.js";
import FactoryDetailPage from "views/FactoryDetailPage/FactoryDetailPage.js";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import { SearchInputContextProvider } from "contexts/search.js";
import ScrollToTop from "./components/common/ScrollToTop";
import SignInPage from "./views/user/SignInPage";
import LoginPage from "./views/user/LoginPage";

var hist = createBrowserHistory();
var appBarBackgroundColor = "transparent";

function App() {
  return (
    <div>
      {/* style={{ paddingLeft: 40, paddingRight: 40 }} */}
      {console.log("??")}
      <SearchInputContextProvider>

        <Router history={hist}>
        <Header
            brand="분당선불폰"
            rightLinks={<HeaderLinks />}
            fixed
            color={
              hist.location.pathname.includes("signin") ||
              hist.location.pathname.includes("login")
                ? "dark"
                : "transparent"
            }
            changeColorOnScroll={{
              height: 200,
              color: "white",
            }}
          />
          <ScrollToTop>
            <Switch>
              <Route path="/gangnam" render={() => <FactoryDetailPage />} />
              <Route path="/bundang" render={() => <FactoryDetailPage />} />
              <Route render={({location})=>(
                  <FactoryDetailPage />
              )}
              />
            </Switch>
          </ScrollToTop>
        </Router>

        <Footer />
      </SearchInputContextProvider>
    </div>
  );
}

export default App;
