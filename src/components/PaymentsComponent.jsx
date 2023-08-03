import React from "react";
import { useGetPaymentsQuery } from "../services/api";
import { List, Loader, Button, Divider } from "semantic-ui-react";

export const PaymentsComponent = ({ serviceId }) => {
  const {
    data: payments,
    isFetching,
    isError,
    refetch,
  } = useGetPaymentsQuery(serviceId);

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
  ) : (
    <>
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Button onClick={refetch} circular icon="undo" basic positive />
      </div>
      <Divider />
      <List divided verticalAlign="middle">
        {payments?.map((p, i) => (
          <List.Item key={i}>
            <List.Content floated="right">{p?.summa || 0} р.</List.Content>
            <List.Content>
              <List.Header as="a">{`${p?.docdate || ""} г.`}</List.Header>
              <List.Description as="a">
                {p?.pay_name || "Оплата за электроэнергию"}
              </List.Description>
            </List.Content>
          </List.Item>
        ))}
      </List>
    </>
  );
};
