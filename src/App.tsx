import React, { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { AuthRoutes } from "./routes/Authroutes";

function App() {
  const [routes, setRoutes] = useState([...AuthRoutes]);

  return (
    <Router>
      <Suspense>
        <Routes>
          {routes?.map((route) => (
            <Route key={route?.id} path={route?.url} element={route?.element} />
          ))}
        </Routes>
      </Suspense>
      {/* <Snackbar /> */}
    </Router>
  );
}

export default App;
