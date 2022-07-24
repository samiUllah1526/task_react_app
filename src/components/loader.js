import React from "react";
import { Spin } from "antd";
import { Layout } from "./layout";
import { Wrapper, Row } from "./styles";

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
