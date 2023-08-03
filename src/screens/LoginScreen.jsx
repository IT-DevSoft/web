import React, { useState } from "react";
import { useLoginMutation } from "../services/api";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/reducers/auth";
import { useNavigate } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import "../css/loginScreen.css";
import { LogotypeComponent } from "../components/LogotypeComponent";
import { PhoneInputComponent } from "../components/PhoneInputComponent";

export const LoginScreen = () => {
  const [error, setError] = useState();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleOnClick = () => {
    setError();
    login(form)
      .unwrap()
      .then((user) => {
        dispatch(setCredentials(user));
        navigate("/");
      })
      .catch((error) => {
        if (error.originalStatus === 401) {
          setError("Неверный логин или пароль");
          return;
        }
        setError("Сервис временно недоступен");
      });
  };

  return (
    <div className="login-screen">
      <div style={{ minWidth: "350px" }}>
        <Segment secondary style={{ padding: "30px" }}>
          <LogotypeComponent />
          <Form>
            <Form.Field>
              <label>Логин</label>
              <div className="ui left icon input">
                <PhoneInputComponent
                  disabled={isLoading}
                  onChange={(phone) => setForm({ ...form, username: phone })}
                />
                <i aria-hidden="true" className="phone icon"></i>
              </div>
            </Form.Field>
            <Form.Field>
              <label>Пароль</label>
              <div className="ui left icon input">
                <input
                  value={form?.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  type="password"
                />
                <i aria-hidden="true" className="lock icon"></i>
              </div>
            </Form.Field>
            <Button loading={isLoading} color="green" onClick={handleOnClick}>
              Войти
            </Button>
            <Button basic onClick={() => navigate("/sign_up")}>
              Регистрация
            </Button>
            {error ? (
              <div className="ui negative mini message">
                <p>{error}</p>
              </div>
            ) : null}
          </Form>
        </Segment>
      </div>
    </div>
  );
};
