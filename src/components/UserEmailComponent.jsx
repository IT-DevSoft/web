import React from "react";
import { Label, Input, Form, Button, Icon } from "semantic-ui-react";
import { useEditEmailMutation, useGetProfileQuery } from "../services/api";
import { useEffect } from "react";
import { useState } from "react";

export const EditEmailComponent = () => {
  const [email, setEmail] = useState("");
  const [isSwowInput, setIsSwowInput] = useState(false);

  const {
    data: profile,
    isFetching,
    isLoading: isLoadingProfile,
    refetch,
  } = useGetProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [editEmail, { isLoading, isError }] = useEditEmailMutation();

  useEffect(() => {
    setEmail(profile?.email || "");
  }, [profile?.email]);

  const handleSaveEmail = () => {
    editEmail({ email })
      .unwrap()
      .then(() => refetch());
  };

  if (isLoadingProfile) {
    return <div>Загрузка данных...</div>;
  }

  return (
    <Form.Field>
      {isSwowInput || profile?.email ? (
        <>
          <Label pointing="below">Email</Label>
          <Input
            loading={isFetching || isLoading}
            iconPosition="left"
            type="text"
            action
            placeholder="Адрес электронной почты"
          >
            <Icon name="at" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button
              onClick={handleSaveEmail}
              disabled={profile?.email === email}
              color="grey"
              type="button"
            >
              Сохранить
            </Button>
          </Input>
        </>
      ) : (
        <Button onClick={() => setIsSwowInput(true)} color="yellow">
          Укажите Email для получения квитанции
        </Button>
      )}
    </Form.Field>
  );
};
