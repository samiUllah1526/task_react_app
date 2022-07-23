import { Routes, Route } from "react-router-dom";
import { routesMap } from "./routerMap";

export const Router = () => {
  return (
    <Routes>
      {routesMap.map((route) => {
        return (
          <Route key={route.path} path={route.path} element={route.component} />
        );
      })}
    </Routes>
  );
};
