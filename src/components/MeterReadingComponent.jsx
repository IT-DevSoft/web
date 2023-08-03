import React, { useEffect, useState } from "react";
import {
  useGetMeterReadingsQuery,
  useSetMeterReadingsMutation,
} from "../services/api";
import {
  Button,
  Icon,
  Modal,
  Header,
  List,
  Loader,
  Segment,
  Dimmer,
  Image,
  Form,
  Input,
} from "semantic-ui-react";
import paragraph from "../assets/paragraph.png";
import { Notification } from "../common/notification";

const notifi = new Notification(3000);

export const MeterReadingComponent = ({
  btnText = "Показания",
  btnColor = "green",
  disabled,
  meter,
}) => {
  const [open, setOpen] = useState(false);

  if (!meter || !meter?.id) {
    return (
      <Button disabled icon labelPosition="left" color={btnColor}>
        <Icon name="calculator" />
        {btnText}
      </Button>
    );
  }

  const {
    data: readings,
    isFetching,
    isError,
    refetch,
  } = useGetMeterReadingsQuery(meter?.id);

  return (
    <Modal
      size="tiny"
      closeIcon
      open={open}
      trigger={
        <Button disabled={disabled} icon labelPosition="left" color={btnColor}>
          <Icon name="calculator" />
          {btnText}
        </Button>
      }
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header
        icon="calculator"
        content={`Показания ПУ № ${meter?.number || "Не указан"}`}
      />
      <Modal.Content>
        {isError ? (
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
        ) : isFetching ? (
          <Segment>
            <Dimmer active inverted>
              <Loader size="medium">Загрузка</Loader>
            </Dimmer>

            <Image src={paragraph} />
          </Segment>
        ) : readings?.length > 0 ? (
          <>
            <List divided verticalAlign="middle">
              {readings?.map((p, i) => (
                <List.Item key={i}>
                  <List.Content floated="right">
                    {p?.ph || 0} кВт/ч.
                  </List.Content>
                  <List.Content>
                    <List.Header as="a">{`${p?.docdate || ""} г.`}</List.Header>
                    <List.Description as="a">
                      Показания прибора учета
                    </List.Description>
                  </List.Content>
                </List.Item>
              ))}
            </List>
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <Button onClick={refetch} circular icon="undo" basic positive />
            </div>
          </>
        ) : (
          <Header as="h4">
            <Icon name="settings" />
            <Header.Content>Нет показаний</Header.Content>
          </Header>
        )}
      </Modal.Content>
      <Modal.Actions>
        <TakingEvidence id={meter?.id} />
      </Modal.Actions>
    </Modal>
  );
};

export const TakingEvidence = ({ id }) => {
  const [currentValue, setCurrentValue] = useState("");
  const [setReadings, { isLoading }] = useSetMeterReadingsMutation();

  if (!id) {
    return null;
  }

  const handleSaveBtnClick = () => {
    if (!currentValue) {
      notifi.show("Текущие показания не указаны");
      return;
    }
    setReadings({ id, consumption: currentValue })
      .unwrap()
      .then(() => {
        setCurrentValue("");
      })
      .catch((ex) => {
        notifi.show(ex?.data || "Ошибка на сервере. Попробуйте позже");
      });
  };

  return (
    <Form>
      <Form.Group inline>
        <Input
          disabled={isLoading}
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          type="number"
          placeholder="Текущие показания"
        />
        <Button
          loading={isLoading}
          style={{ marginLeft: "3px" }}
          color="green"
          onClick={handleSaveBtnClick}
        >
          <Icon name="checkmark" /> Cохранить
        </Button>
      </Form.Group>
    </Form>
  );
};
