import React from "react";
// import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { logout } from "./actions";
import "./App.css";

import Main from "./containers/Main/Main";
import Auth from "./containers/SignUpSignInUI/Auth";
import PrivateRoute from "./routes/PrivateRoute";
const App = () => {
  // const auth = useSelector((state) => state.auth);
  // const dispatch = useDispatch();
  
  //  window.onbeforeunload = function() {
 
  //   dispatch(logout(auth.uid));
    
  //  }
  
  return (
    <div className="App">
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
