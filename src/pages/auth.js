import React, { useEffect } from "react";
// APIs
import { login, register } from "./../api/axios";

// hooks
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";

// utilities
import { setToken } from "../utlities";

// UI components
import { Button, Form, Input, message } from "antd";
import { Layout } from "../components/layout";
import { Wrapper } from "../components/layout/styles";
import { Label } from "../global.styles";

export const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    mutate: loginMutation,
    isError: isLoginError,
    error: loginError,
    isSuccess: isLoginSuccess,
    isLoading: isLoginLoading,
    status: loginStatus,
    data: loginData,
  } = useMutation(login);

  const {
    mutate: registerMutation,
    isError: isregisterError,
    error: registerError,
    isLoading: registerIsLoading,
    status: registerStatus,
    isSuccess: isRegisterSuccess,
    data: registerData,
  } = useMutation(register);

  let bottonText;
  let isRegisterRouter = false;
  switch (location.pathname) {
    case "/register":
      isRegisterRouter = true;
      bottonText = "Register";
      break;

    case "/login":
      bottonText = "Login";
      break;

    default:
      console.log("problem in auth routing");
  }

  useEffect(() => {
    if (isLoginSuccess) {
      message.success("Login successfully!");
      let { token } = loginData;
      setToken(token);
      navigate("/");
    }

    if (isLoginError) {
      message.error(loginError.response.data.message);
    }
  }, [isLoginLoading, isLoginSuccess, loginStatus]);

  useEffect(() => {
    if (isRegisterSuccess) {
      message.success("Registeration successful!");
      navigate("/login");
    }

    if (isregisterError) {
      message.error(registerError.response.data.message);
    }
  }, [registerIsLoading, isRegisterSuccess, registerStatus]);

  const onFinish = (values) => {
    !isRegisterRouter ? loginMutation(values) : registerMutation(values);
  };

  const onFinishFailed = () => {};
  return (
    <Layout>
      <Wrapper>
        <Form
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 14,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {isRegisterRouter && (
            <Form.Item label={<Label>Name</Label>} name="name">
              <Input />
            </Form.Item>
          )}

          <Form.Item
            label={<Label>Email</Label>}
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={<Label>Password</Label>}
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          {isRegisterRouter && (
            <Form.Item label={<Label>Gender</Label>} name="gender">
              <Input />
            </Form.Item>
          )}

          <Form.Item
            wrapperCol={{
              offset: 6,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              {bottonText}
            </Button>
          </Form.Item>
        </Form>
      </Wrapper>
    </Layout>
  );
};
