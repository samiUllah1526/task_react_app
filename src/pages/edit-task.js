import React, { useEffect } from "react";

// APIs
import { addTaskByID, getTaskByID } from "../api/axios";

// Hooks
import { useMutation, useQuery } from "react-query";

// UI components
import { Layout } from "../components/layout";
import { Wrapper } from "../components/layout/styles";
import { Button, Form, Input, message } from "antd";
import { Loader } from "../components/loader";
import { useNavigate, useParams } from "react-router-dom";
const { TextArea } = Input;

export const EditTask = () => {
  const navigate = useNavigate();
  const param = useParams();

  const { mutate, isError, error, isSuccess, isLoading, status, data } =
    useMutation(addTaskByID);

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

    title = task?.title || "";
    description = task?.description || "";
  }, [isTaskLoading, isTaskSuccess, taskStatus, navigate]);

  useEffect(() => {
    if (isSuccess) {
      message.success("Task updated successfully!");
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
    mutate(param?.id, values);
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
            label="Task title"
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
            label="Description"
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
