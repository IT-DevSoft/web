import React, { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import { useSendCodeMutation } from "../services/api";
import { useSelector } from "react-redux";
import { selectUser } from "../store/reducers/auth";
import { Notification } from "../common/notification";

const notifi = new Notification(5000);

export const ConfirmButtonComponent = () => {
  const [seconds, setSeconds] = useState(0);
  const user = useSelector(selectUser);

  const [sendCodeMutation, { isLoading: sendCodeIsLoading }] =
    useSendCodeMutation();

  useEffect(() => {
    sendCode();
  }, []);

  const sendCode = () => {
    sendCodeMutation({ login: user.login, type: "sms" })
      .unwrap()
      .then(() => {
        setSeconds(60);
      })
      .catch(() => notifi.show("Произошла ошибка. Попробуйте позже."));
  };

  const handleConfirn = () => {};

  useEffect(() => {
    const id = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => clearInterval(id);
  }, [seconds]);

  return seconds === 0 ? (
    <Button loading={sendCodeIsLoading} onClick={sendCode} positive>
      Получить код
    </Button>
  ) : (
    <Button positive disabled>{`Получить повторно ${seconds}s`}</Button>
  );
};
