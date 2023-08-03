import React from "react";
import { Outlet } from "react-router-dom";
import { Menu, Image, Header } from "semantic-ui-react";
import { LogOutComponent } from "./LogOutComponent";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

export const TabBarComponent = () => {
  return (
    <div>
      <Menu pointing secondary>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active item" : "item")}
        >
          <Header as="h3">
            <Image circular src={logo} />
            АО "Чеченэнерго"
          </Header>
        </NavLink>
        <Menu.Menu position="right">
          <LogOutComponent />
        </Menu.Menu>
      </Menu>
      <Outlet />
    </div>
  );
};
