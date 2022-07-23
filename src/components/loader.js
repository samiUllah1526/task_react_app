import React from "react";
import { Spin } from "antd";
import { Layout } from "./layout";
import { Wrapper } from "./layout/styles";
import { Row } from "../global.styles";

export const Loader = () => {
  return (
    <Layout>
      <Wrapper>
        <Row justify={"center"}>
          <Spin tip="Loading tasks..."></Spin>
        </Row>
      </Wrapper>
    </Layout>
  );
};
