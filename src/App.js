import React from "react";
import Header from "components/Header/Header.js";
// pages for this product
import Components from "views/Components/Components.js";
import FactoryDetailPage from "views/FactoryDetailPage/FactoryDetailPage.js";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import {
  SearchInputContextProvider,
} from "contexts/search.js";
import ScrollToTop from './components/common/ScrollToTop';


var hist = createBrowserHistory();
function App() {
  return (
    <div>
      {/* style={{ paddingLeft: 40, paddingRight: 40 }} */}
      <SearchInputContextProvider>
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
          <ScrollToTop>
          <Switch>
            <Route path="/store/:id" component={FactoryDetailPage} />
            <Route path="/" render={() => <Components />} />
          </Switch>
          </ScrollToTop>
        </Router>

        <Footer />
      </SearchInputContextProvider>
    </div>
  );
}

export default App;
