import React, { useEffect } from "react";

// APIs
import { addTask, getTaskByID } from "./../api/axios";

// Hooks
import { useMutation, useQuery } from "react-query";

// UI components
import { Layout } from "../components/layout";
import { Wrapper } from "../components/layout/styles";
import { Button, Form, Input, message } from "antd";
import { Loader } from "../components/loader";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Label } from "../global.styles";
const { TextArea } = Input;

export const Task = () => {
  const navigate = useNavigate();
  const param = useParams();

  const { mutate, isError, error, isSuccess, isLoading, status, data } =
    useMutation(addTask);

  const {
    isLoading: isTaskLoading,
    isError: isTaskError,
    isSuccess: isTaskSuccess,
    status: taskStatus,
    error: taskError,
    data: task,
  } = useQuery(["task", param?.id], () => getTaskByID(param?.id), {
    retry: 2,
  });

  let title = task?.title || "";
  let description = task?.description || "";

  useEffect(() => {
    if (isTaskError) {
      taskError.response.data.message.map((msg) => {
        message.error(msg);
      });
    }

    console.log("loadededed");
    title = task?.title || "";
    description = task?.description || "";

    return () => {
      console.log("ubloade");
      title = "";
      description = "";
    };
  }, [isTaskLoading, isTaskSuccess, taskStatus, navigate]);

  useEffect(() => {
    if (isSuccess) {
      message.success("Task created successfully!");
      navigate("/");
    }

    if (isError) {
      console.log("error.response.data.message", error.response.data.message);

      error.response.data.message.map((msg) => {
        message.error(msg);
      });
    }
  }, [isLoading, isSuccess, status]);

  const onFinish = (values) => {
    console.log("Success:", values);
    mutate(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  if (isLoading || isTaskLoading) return <Loader />;

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
          initialValues={{
            title,
            description,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label={<Label>Task title</Label>}
            name="title"
            rules={[
              {
                required: true,
                message: "Please enter the task title!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={<Label>Description</Label>}
            name="description"
            rules={[
              {
                required: true,
                message: "Please the task description!",
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 6,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Wrapper>
    </Layout>
  );
};
