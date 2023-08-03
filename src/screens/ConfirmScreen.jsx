import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setCredentials } from "../store/reducers/auth";
import { useLocation, Navigate } from "react-router-dom";
import { Segment, Message, Form, Button } from "semantic-ui-react";
import { LogotypeComponent } from "../components/LogotypeComponent";
import { CodeInputComponent } from "../components/CodeInputComponent";
import { ConfirmButtonComponent } from "../components/ConfirmButtonComponent";
import { useConfirmMutation } from "../services/api";
import { Notification } from "../common/notification";

const notifi = new Notification(5000);

export const ConfirmScreen = () => {
  let location = useLocation();
  const user = useSelector(selectUser);
  const [code, setCode] = useState("");
  const dispatch = useDispatch();

  const [confirm, { isLoading: confirmIsLoading }] = useConfirmMutation();

  if (user?.status != 0) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  const handleOnClick = () => {
    if (user && user?.login && code) {
      confirm({ login: user.login, code })
        .unwrap()
        .then((user) => {
          dispatch(setCredentials(user));
        })
        .catch((ex) => {
          console.log(ex);
          notifi.show(
            ex?.data?.message || "Произошла ошибка. Попробуйте позже."
          );
        });
    }
  };

  return (
    <div className="login-screen">
      <div style={{ minWidth: "350px", padding: "10px" }}>
        <Segment secondary style={{ padding: "30px" }}>
          <LogotypeComponent />
          <Message warning>
            <Message.Header>Подтверждение профиля</Message.Header>
            <p>Для продолжения работы подтвердите номер телефона.</p>
          </Message>
          <Form>
            <Form.Field>
              <div style={{ display: "flex" }}>
                <div style={{ flex: 1 }}>
                  <CodeInputComponent onChange={setCode} />
                </div>
                <div style={{ marginLeft: "3px" }}>
                  <ConfirmButtonComponent />
                </div>
              </div>
            </Form.Field>
            <Button
              loading={confirmIsLoading}
              disabled={code.length < 4}
              onClick={handleOnClick}
              type="button"
              positive
            >
              Подтвердить
            </Button>
          </Form>
        </Segment>
      </div>
    </div>
  );
};
