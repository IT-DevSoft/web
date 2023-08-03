import React, { useState } from "react";
import { useDeleteAccountMutation } from "../services/api";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import "../css/AccountsComponent.css";

export const DeleteAccountComponent = ({ account, disabled }) => {
  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();
  const [open, setOpen] = useState(false);

  const handleOnCLick = (e) => {
    e.stopPropagation();
    deleteAccount(account.id)
      .unwrap()
      .then(() => {
        setOpen(false);
      });
  };

  return (
    <Modal
      closeIcon
      open={open}
      trigger={
        <Button
          loading={isLoading}
          disabled={!account || disabled}
          size="small"
          basic
          circular
          icon="trash"
          color="red"
        />
      }
      onOpen={(e) => {
        e.stopPropagation();
        setOpen(true);
      }}
      onClose={(e) => {
        e.stopPropagation();
        setOpen(false);
      }}
    >
      <Header icon="archive" content="Удаление лицевого счета" />
      <Modal.Content>
        <p>{`Вы действительно хотите удалить лицевой счет ${account.account} ?`}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)} color="red">
          <Icon name="remove" /> Нет
        </Button>
        <Button loading={isLoading} color="green" onClick={handleOnCLick}>
          <Icon name="checkmark" /> Да
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
