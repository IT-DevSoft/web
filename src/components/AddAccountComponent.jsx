import React, { useState } from "react";
import {
  Button,
  Header,
  Icon,
  Modal,
  Input,
  Message,
  Form,
  Label,
} from "semantic-ui-react";
import { useAddAccountMutation } from "../services/api";
import { useEffect } from "react";

export const AddAccountComponent = () => {
  const [open, setOpen] = useState(false);
  const [account, setAccount] = useState("");
  const [address, setAddress] = useState("");

  const [addAccount, { isLoading, error, reset }] = useAddAccountMutation();

  useEffect(() => {
    if (open) {
      setAccount("");
      setAddress("");
      reset();
    }
  }, [open]);

  const handleOnBtnSave = () => {
    if (account) {
      addAccount({ account, address })
        .unwrap()
        .then(() => {
          setOpen(false);
          setAccount("");
          setAddress("");
        });
    }
  };

  return (
    <Modal
      size="tiny"
      closeIcon
      open={open}
      trigger={
        <Button basic circular icon="edit outline" color="green"></Button>
      }
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon="edit" content="Добавление ЛС" />
      <Modal.Content>
        <Form>
          <Form.Field>
            <Label pointing="below">Лицевой счет</Label>
            <Input
              disabled={isLoading}
              value={account}
              onChange={(_, event) => setAccount(event.value)}
              loading={isLoading}
              placeholder="Пример: 1500010101"
            />
          </Form.Field>
          <Form.Field>
            <Label pointing="below">Адрес</Label>
            <Input
              disabled={isLoading}
              value={address}
              onChange={(_, event) => setAddress(event.value)}
              loading={isLoading}
              placeholder="Пример: Грозный, Наурская, 10"
            />
          </Form.Field>
        </Form>

        {error ? (
          <Message negative>
            <Message.Header>Ошибка добавления</Message.Header>
            <p>{`${error?.data || "Указанный лицевой счет не существует"}`}</p>
          </Message>
        ) : null}
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => setOpen(false)}>
          <Icon name="remove" /> Отмена
        </Button>
        <Button
          loading={isLoading}
          disabled={!account}
          color="green"
          onClick={handleOnBtnSave}
        >
          <Icon name="checkmark" /> Добавить
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
