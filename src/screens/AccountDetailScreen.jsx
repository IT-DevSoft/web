import React from "react";
import { AccountsComponent } from "../components/AccountsComponent";
import { AccountDetailComponent } from "../components/AccountDetailComponent";

export const AccountDetailScreen = () => {
  return (
    <div className="ui container">
      <AccountsComponent />
      <AccountDetailComponent />
    </div>
  );
};
