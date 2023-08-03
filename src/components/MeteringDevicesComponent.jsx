import React from "react";
import { useGetMeteringDevicesQuery } from "../services/api";
import { List, Loader, Header, Icon } from "semantic-ui-react";
import { MeterReadingComponent } from "./MeterReadingComponent";

export const MeteringDevicesComponent = ({ serviceId }) => {
  if (!serviceId) {
    return (
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          padding: "10px",
        }}
      >
        <Header as="h4">
          <Icon name="settings" />
          <Header.Content>Нет активных приборов учета</Header.Content>
        </Header>
      </div>
    );
  }

  const {
    data: meteringDevices,
    isFetching,
    isError,
    refetch,
  } = useGetMeteringDevicesQuery(serviceId);

  return isFetching ? (
    <Loader active inline="centered" />
  ) : isError ? (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <Button onClick={refetch} negative>
        Ошибка. Попробовать еще раз
      </Button>
    </div>
  ) : meteringDevices?.length > 0 ? (
    <List divided relaxed>
      {meteringDevices?.map((m) => (
        <List.Item key={m.id}>
          <List.Content floated="right">
            <MeterReadingComponent meter={m} />
          </List.Content>
          <List.Icon name="calculator" size="large" verticalAlign="middle" />
          <List.Content>
            <List.Header as="a">{`Тип прибора учета: ${m.type}`}</List.Header>
            <List.Description as="a">
              <span style={{ fontWeight: "bold" }}>Номер прибора учета:</span>
              {` ${m?.number || "Не указан"}`}
            </List.Description>
            <List.Description as="a">
              <span style={{ fontWeight: "bold" }}>Номер пломбы:</span>
              {` ${m?.seal || "Не указан"}`}
            </List.Description>
          </List.Content>
        </List.Item>
      ))}
    </List>
  ) : (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        padding: "10px",
      }}
    >
      {" "}
      <Header as="h4">
        <Icon name="settings" />
        <Header.Content>Нет активных приборов учета</Header.Content>
      </Header>
    </div>
  );
};
