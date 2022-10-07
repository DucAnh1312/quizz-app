import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import router from "../config/router";
import Error from "../components/NotFound/Error";

const Routing = () => {
  return (
    <Router>
      <Routes>
        {router.map((route, index) => (
          <Route key={index} path={route.path} element={route.component} />
        ))}
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};
export default Routing;
