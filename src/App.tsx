import React from "react";
import { Routes, Route } from "react-router-dom";
import Routers, { RouterType } from "./routers/index";

const App: React.FC = () => {
  return (
    <Routes>
      {
        Routers.map((router: RouterType) => (
          <Route
            key={router.path}
            path={router.path}
            element={<router.element />}
          >
          </Route>
        ))
      }
    </Routes>
  );
};

export default App;