import React from "react";
import { Result } from "antd";
import { Layout } from "./layout";
import { Wrapper, Row } from "./styles";

export const ResultPage = ({ status, title, subTitle, extra }) => {
  return (
    <Layout>
      <Wrapper>
        <Row justify={"center"}>
          <Result
            status={status}
            title={title}
            subTitle={subTitle}
            extra={extra}
          ></Result>
        </Row>
      </Wrapper>
    </Layout>
  );
};
