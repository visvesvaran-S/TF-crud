import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Signin from "./Signin";
import Moments from "./Moments";
import Addmoments from "./Addmoments";
import Editmoments from "./Editmoments";
function Router() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" Component={Signup} />
          <Route path="/signin" Component={Signin} />
          <Route path="/moments" Component={Moments} />
          <Route path="/addmoments" Component={Addmoments} />
          <Route path="/edtimoments/:userid" Component={Editmoments} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
