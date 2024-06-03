import React ,{useContext} from "react";
import {AuthContext} from "./context/authContext/AuthContext"
import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { Switch, Route, Redirect } from "react-router-dom";
import Watch from "./pages/Watch/Watch";

function App() {
  const {user} = useContext(AuthContext);
  return (
    <React.Fragment>
      <Switch>
        <Route path="/" exact>
          {user ? <Home /> : <Redirect to="/register" />}
        </Route>
        <Route path="/register">
        {!user ? <Register /> : <Redirect to="/" />}
        </Route>
        <Route path="/login">
          {!user ? <Login /> : <Redirect to="/" />}
        </Route>
        {user && (
          <>
            <Route path="/movies">
              <Home type="movie" />
            </Route>
            <Route path="/series">
              <Home type="series" />
            </Route>
            <Route path="/watch">
              <Watch />
            </Route>
          </>
        )}
      </Switch>
    </React.Fragment>
  );
}

export default App;
