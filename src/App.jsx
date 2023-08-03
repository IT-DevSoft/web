import React from "react";
import { Routes, Route } from "react-router-dom";
import { LoginScreen } from "./screens/LoginScreen";
import { RouterComponent } from "./components/RouterComponent";
import { RegistrationScreen } from "./screens/RegistrationScreen";
import { ConfirmScreen } from "./screens/ConfirmScreen";
import "semantic-ui-css/semantic.min.css";
import "./css/Notification.css";

export const App = () => {
  return (
    <Routes>
      <Route path="/*" element={<RouterComponent />} />
      <Route path="/sign_in" element={<LoginScreen />} />
      <Route path="/sign_up" element={<RegistrationScreen />} />
      <Route path="/confirm" element={<ConfirmScreen />} />
    </Routes>
  );
};
