import React, { useState } from "react";
import { Form, Button, Segment, Message } from "semantic-ui-react";
import { LogotypeComponent } from "../components/LogotypeComponent";
import { PhoneInputComponent } from "../components/PhoneInputComponent";
import "../css/RegistrationScreen.css";
import { useSignUpMutation } from "../services/api";
import { setCredentials } from "../store/reducers/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const RegistrationScreen = () => {
  const [signUp, { isLoading }] = useSignUpMutation();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    phone: "",
    password: "",
    passwordConfirm: "",
    accountNumber: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnClickBtnSave = () => {
    if (!form.phone) {
      setError("Не заполнено поле номер телефона");
      return;
    }
    if (!form.accountNumber) {
      setError("Не заполнено поле лицевой счет");
      return;
    }
    if (!form.password) {
      setError("Не заполнено поле пароль");
      return;
    }
    if (form.password.length < 8) {
      setError("Пароль должен быть не менее 8 символов");
      return;
    }
    if (!form.passwordConfirm) {
      setError("Не заполнено поле подтверждение пароля");
      return;
    }
    if (form.passwordConfirm !== form.password) {
      setError("Пароли не совпадают");
      return;
    }
    setError("");
    signUp(form)
      .unwrap()
      .then((user) => {
        dispatch(setCredentials(user));
        navigate("/");
      })
      .catch((error) => {
        setError(
          error?.data?.Message ||
            "Произошла ошибка на сервере. Попробуйте позже"
        );
      });
  };

  return (
    <div className="sign_up_form">
      <div style={{ minWidth: "350px" }}>
        <Segment secondary style={{ padding: "30px" }}>
          <LogotypeComponent />
          <Form>
            <Form.Field>
              <label>Телефон</label>
              <div className="ui left icon input">
                <PhoneInputComponent
                  disabled={isLoading}
                  onChange={(phone) => setForm({ ...form, phone })}
                />
                <i aria-hidden="true" className="phone icon"></i>
              </div>
            </Form.Field>
            <Form.Field>
              <label>Лицевой счет</label>
              <div className="ui left icon input">
                <input
                  disabled={isLoading}
                  placeholder="15000000000"
                  onChange={(e) =>
                    setForm({ ...form, accountNumber: e.target.value })
                  }
                />
                <i aria-hidden="true" className="home icon"></i>
              </div>
            </Form.Field>
            <Form.Field>
              <label>Пароль (не менее 8 символов)</label>
              <div className="ui left icon input">
                <input
                  disabled={isLoading}
                  type="password"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
                <i aria-hidden="true" className="lock icon"></i>
              </div>
            </Form.Field>
            <Form.Field>
              <label>Подтверждение</label>
              <div className="ui left icon input">
                <input
                  disabled={isLoading}
                  type="password"
                  onChange={(e) =>
                    setForm({ ...form, passwordConfirm: e.target.value })
                  }
                />
                <i aria-hidden="true" className="lock icon"></i>
              </div>
            </Form.Field>
            <Button
              loading={isLoading}
              positive
              onClick={handleOnClickBtnSave}
              type="button"
            >
              Сохранить
            </Button>
            <Button
              basic
              loading={isLoading}
              onClick={() => navigate("/sign_in")}
              type="button"
            >
              У меня есть аккаунт
            </Button>
            {error ? (
              <Message negative>
                <Message.Header as="h4">Ошибка</Message.Header>
                <Message.Content>{error}</Message.Content>
              </Message>
            ) : null}
          </Form>
        </Segment>
      </div>
    </div>
  );
};
