import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Main from "./containers/Main/Main";
import Auth from "./containers/SignUpSignInUI/Auth";
import PrivateRoute from "./routes/PrivateRoute";
const App = () => {
  return (
    <div className="App">
      {/* <Register/> */}
      <Router>
        <Routes>
          {/* only logged in user can access this home route */}
          <Route
            path="/"
            exact
            element={
              <PrivateRoute>
                <Main />
               
              </PrivateRoute>
            }
          />
          <Route exact path="/signin" element={<Auth />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
