import React from "react";
import { useState } from "react";
import {
  Button,
  Header,
  Icon,
  Modal,
  Form,
  Input,
  Label,
  Message,
} from "semantic-ui-react";
import { useMakePayMutation } from "../services/api";
import { useEffect } from "react";
import { EditEmailComponent } from "./UserEmailComponent";

export const PaymentButtonComponent = ({ disabled, color, account }) => {
  const [open, setOpen] = useState(false);
  const [pay, { isLoading, isError, reset }] = useMakePayMutation();
  const [sum, setSum] = useState(account?.sum || 0);
  const [checkSum, setCheckSum] = useState(false);

  useEffect(() => {
    if (sum <= 0) {
      setCheckSum(true);
    } else {
      setCheckSum(false);
    }
  }, [sum]);

  useEffect(() => {
    if (open) {
      setSum(account?.sum || 0);
      reset();
    }
  }, [open]);

  const handleOnClick = () => {
    pay({ ...account, sum: +sum })
      .unwrap()
      .then((responce) => {
        window.open(responce.invoice_url, "_blank").focus();
        setOpen(false);
      });
  };

  return (
    <Modal
      size="tiny"
      closeIcon
      open={open}
      trigger={
        <Button
          loading={isLoading}
          disabled={disabled}
          icon
          labelPosition="left"
          color={color}
        >
          <Icon name="dollar" />
          Оплатить
        </Button>
      }
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon="payment" content="Оплата за электроэнергию" />
      <Modal.Content>
        <Form>
          <Form.Field>
            <Label pointing="below">Сумма</Label>
            <Input
              disabled={isLoading}
              min="0"
              type="number"
              value={sum}
              onChange={(_, event) => setSum(event.value)}
              loading={isLoading}
              placeholder="Сумма"
            />
          </Form.Field>
          <EditEmailComponent />
        </Form>
        {checkSum ? (
          <Message negative>
            <p>Оплачивая сумма должна быть больше нуля</p>
          </Message>
        ) : null}
        {isError ? (
          <Message negative>
            <p>Не удалость провести платеж. Попробуйте позже</p>
          </Message>
        ) : null}
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)} color="red">
          <Icon name="remove" /> Отмена
        </Button>
        <Button
          disabled={checkSum}
          loading={isLoading}
          color="green"
          onClick={handleOnClick}
        >
          <Icon name="checkmark" /> Оплатить
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
