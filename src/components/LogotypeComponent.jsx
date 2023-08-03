import React from "react";
import { Header, Image } from "semantic-ui-react";
import logo from "../assets/logo.png";

export const LogotypeComponent = () => {
  return (
    <Header as="h3" icon textAlign="center">
      <Image src={logo} size="massive" circular />
      <Header.Content>АО "Чеченэнерго"</Header.Content>
    </Header>
  );
};
