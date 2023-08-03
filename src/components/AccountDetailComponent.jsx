import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAccount } from "../store/reducers/account";
import { useGetAccountMutation } from "../services/api";
import { PaymentButtonComponent } from "./PaymentButtonComponent";
import {
  Card,
  Feed,
  Message,
  Button,
  List,
  Header,
  Loader,
} from "semantic-ui-react";
import { AccountIndicators } from "./HOC/AccountIndicators";
import { useState } from "react";
import { Pages } from "../common/const";
import { MeterReadingComponent } from "./MeterReadingComponent";
import { CertificateOfDebtComponent } from "./CertificateOfDebtComponent";
import "../css/AccountDetailComponent.css";

export const AccountDetailComponent = () => {
  const account = useSelector(selectAccount);
  const [tab, setTab] = useState(Pages.PAYMENTS.key);

  const [getAccount, { data: accountDetail, isLoading, isError }] =
    useGetAccountMutation();

  useEffect(() => {
    if (account?.account) {
      getAccount(account?.account);
    }
  }, [account?.account]);

  const isDebp = () => {
    return accountDetail?.services[0]?.balance > 0;
  };

  const balance = () => {
    return accountDetail?.services[0]?.balance || 0;
  };

  const isExistDevice = () => {
    return accountDetail?.meteringDevices[0] || null;
  };

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          Детализация лицевого счета {accountDetail?.account}{" "}
          <Button
            onClick={() => getAccount(account?.account)}
            circular
            icon="undo"
            basic
            positive
          />
        </Card.Header>
      </Card.Content>
      {isError ? (
        <Card.Content>
          <div
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <Button negative onClick={() => getAccount(account?.account)}>
              Ошибка. Попробовать еще раз
            </Button>
          </div>
        </Card.Content>
      ) : (
        <>
          <Card.Content>
            {isLoading ? (
              <Loader active inline="centered" />
            ) : (
              <>
                <Feed>
                  <Feed.Event>
                    <Feed.Label icon="user" />
                    <Feed.Content>
                      <Feed.Date content="ФИО" />
                      <Feed.Summary>{accountDetail?.name}</Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                </Feed>
                <Feed>
                  <Feed.Event>
                    <Feed.Label icon="home" />
                    <Feed.Content>
                      <Feed.Date content="Адрес" />
                      <Feed.Summary>{accountDetail?.address}</Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                </Feed>
                <Message color={isDebp() ? "red" : "green"}>
                  <Message.Header>
                    {isDebp() ? "Задолженность" : "Переплата"}
                  </Message.Header>
                  <List divided relaxed>
                    <List.Item>
                      <List.Content floated="right">
                        <CertificateOfDebtComponent
                          name={accountDetail?.name || ""}
                          account={accountDetail?.account || ""}
                          address={accountDetail?.address || ""}
                          disabled={balance() > 500}
                        />
                        <PaymentButtonComponent
                          disabled={!isDebp()}
                          color={isDebp() ? "red" : "green"}
                          account={{
                            account: accountDetail?.account,
                            serviceId: accountDetail?.services[0].id,
                            sum: balance() >= 0 ? balance() : 0,
                          }}
                        />
                      </List.Content>
                      <List.Icon
                        name="rub"
                        size="large"
                        verticalAlign="middle"
                      />
                      <List.Content>
                        <Header as="h1">
                          {balance() < 0 ? balance() * -1 : balance()}
                        </Header>
                      </List.Content>
                    </List.Item>
                  </List>
                </Message>
                <Message color="blue">
                  <Message.Header>Последние показания</Message.Header>
                  <List divided relaxed>
                    <List.Item>
                      <List.Content floated="right">
                        <MeterReadingComponent
                          disabled={!isExistDevice()}
                          btnText="Передать"
                          btnColor="blue"
                          meter={isExistDevice()}
                        />
                      </List.Content>
                      <List.Icon
                        name="calculator"
                        size="large"
                        verticalAlign="middle"
                      />
                      <List.Content>
                        <Header as="h1">
                          {isExistDevice()?.ph[0]?.ph || 0}
                        </Header>
                      </List.Content>
                    </List.Item>
                  </List>
                </Message>
              </>
            )}
          </Card.Content>
          {accountDetail?.services[0]?.id ? (
            <Card.Content>
              <div>
                <div className="ui pointing secondary menu">
                  {Object.values(Pages).map((i) => (
                    <a
                      onClick={() => setTab(i.key)}
                      key={i.key}
                      className={`item ${tab === i.key ? "active" : ""}`}
                    >
                      {i.title}
                    </a>
                  ))}
                </div>
                <div className="ui segment active tab">
                  <AccountIndicators
                    page={tab}
                    serviceId={accountDetail?.services[0]?.id || 0}
                  />
                </div>
              </div>
            </Card.Content>
          ) : null}
        </>
      )}
    </Card>
  );
};
