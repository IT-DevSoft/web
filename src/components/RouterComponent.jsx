import React from "react";
import { Routes, Route } from "react-router-dom";
import { TabBarComponent } from "./TabBarComponent";
import { RequireAuth } from "./HOC/RequireAuth";
import { AccountDetailScreen } from "../screens/AccountDetailScreen";

export const RouterComponent = () => {
  return (
    <RequireAuth>
      <Routes>
        <Route element={<TabBarComponent />}>
          <Route index element={<AccountDetailScreen />} />
        </Route>
      </Routes>
    </RequireAuth>
  );
};
