import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./containers/Main/HomePage";
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
                <HomePage />
              </PrivateRoute>
            }
          />
          {/* <Route path="/login" component={LoginPage} />  */}
          <Route exact path="/signin" element={<Auth />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
