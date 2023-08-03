import React from "react";
import { Loader, Button, Divider, List } from "semantic-ui-react";
import { useGetAccrualsQuery } from "../services/api";
import { Months } from "../common/const";

export const AccrualsComponent = ({ serviceId }) => {
  const {
    data: accruals,
    isFetching,
    isError,
    refetch,
  } = useGetAccrualsQuery(serviceId);

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
        {accruals?.map((p, i) => (
          <List.Item key={i}>
            <List.Content floated="right">{p?.sum || 0} р.</List.Content>
            <List.Content>
              <List.Header as="a">{`${Months[p?.month] || ""} ${
                p?.year || ""
              } г.`}</List.Header>
              <List.Description as="a">
                {p?.pay_name || "Начисление за электроэнергию"}
              </List.Description>
            </List.Content>
          </List.Item>
        ))}
      </List>
    </>
  );
};
