import React from "react";
import { useDispatch } from "react-redux";
import { Menu } from "semantic-ui-react";
import { removeCredentials } from "../store/reducers/auth";

export const LogOutComponent = () => {
  const dispatch = useDispatch();
  return (
    <Menu.Item
      name="Выйти"
      onClick={() => {
        dispatch(removeCredentials());
      }}
    />
  );
};
