import React, { useState } from "react";

// APIs
import { getTasks } from "./../api/axios";

// Hooks
import { useQuery } from "react-query";

// UI components
import { Button } from "antd";
import { Task } from "../components";
import { Wrapper } from "./../components/layout/styles";
import { Layout } from "./../components/layout";
import { Row } from "../global.styles";
import { ResultPage } from "../components/resultPage";
import { Loader } from "../components/loader";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const [ids, setIDs] = useState([]);
  const {
    isLoading,
    isError,
    error,
    data: tasksdata,
  } = useQuery(["tasks"], getTasks);

  // title="Failed to fetch tasks data"
  // subTitle="Please check you internet connection or reload the page."
  if (isError)
    return (
      <ResultPage
        status={"error"}
        title={"Failed to fetch tasks data"}
        subTitle={"Please check you internet connection or reload the page."}
      />
    );

  if (!isLoading && !tasksdata?.length)
    return (
      <ResultPage
        title={"No tasks are available"}
        subTitle={"To create a new task on the button"}
        extra={
          <Button
            type="primary"
            key="console"
            onClick={() => navigate("/create-task")}
          >
            Create task
          </Button>
        }
      />
    );
  if (isLoading) return <Loader />;

  return (
    <Layout idsToremove={ids}>
      <Wrapper>
        <Row wrap={"wrap"} justify={""}>
          {tasksdata.map((item) => {
            return (
              <Task
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                setIDs={setIDs}
              />
            );
          })}
        </Row>
      </Wrapper>
    </Layout>
  );
};
