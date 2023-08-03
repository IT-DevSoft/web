import React from "react";
import { useGetAccountsQuery } from "../services/api";
import { Card, List, Header, Loader } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { selectAccount, setAccount } from "../store/reducers/account";
import { DeleteAccountComponent } from "./DeleteAccountComponent";
import { AddAccountComponent } from "./AddAccountComponent";
import "../css/AccountsComponent.css";
import { useEffect } from "react";

export const AccountsComponent = () => {
  const accountStorage = useSelector(selectAccount);
  const dispatch = useDispatch();

  const {
    data: accounts = [],
    refetch,
    isFetching: isLoadingAccount,
    isError,
  } = useGetAccountsQuery();

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    const account = accountStorage?.account || "";

    const isFirstMount =
      accounts.length > 0 && !accounts.some((e) => e.account === account);

    if (isFirstMount) {
      handleItemOnCLick(accounts[0].account);
    }
  }, [accountStorage?.account, isLoadingAccount, accounts]);

  const handleItemOnCLick = (account) => {
    dispatch(setAccount({ account }));
  };

  return (
    <Card fluid>
      <div className="card-header">
        <Header as="h3">Лицевые счета</Header>
        <AddAccountComponent />
      </div>
      <Card.Content>
        {isLoadingAccount ? (
          <Loader active inline="centered" />
        ) : (
          <List divided relaxed>
            {accounts.map((item) => (
              <List.Item
                key={item.id}
                onClick={() => {
                  handleItemOnCLick(item.account);
                }}
              >
                {accountStorage?.account == item.account ? (
                  <List.Icon
                    name="lightbulb"
                    size="large"
                    verticalAlign="middle"
                  />
                ) : (
                  <List.Icon
                    name="lightbulb outline"
                    size="large"
                    verticalAlign="middle"
                  />
                )}
                <List.Content>
                  <List.Header as="a">
                    {item?.account || "Нет данных"}
                  </List.Header>
                  <List.Description as="a">
                    {item?.address || "Адрес не указан"}
                  </List.Description>
                </List.Content>
                <div className="delete-btn">
                  <DeleteAccountComponent
                    disabled={item?.account === accountStorage.account}
                    account={item}
                  />
                </div>
              </List.Item>
            ))}
          </List>
        )}
      </Card.Content>
    </Card>
  );
};
