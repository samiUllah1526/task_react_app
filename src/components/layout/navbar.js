import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Hooks
import { useMutation, useQueryClient } from "react-query";

// APIs
import { deleteTask } from "../../api/axios";

// Utilities
import { removeToken, getToken } from "./../../utlities";

// UI components
import styled from "styled-components";
import { Row } from "../styles";
import { message } from "antd";

const Item = styled(Link)`
  color: black;
  // background: ${(props) => (props.disabled ? "yellow" : "")};
  padding: 10px;
  text-decoration: none;
  pointer-events: ${(props) => (props.disabled ? "none" : "")};
  // pointer-events: none;
`;

export const Navbar = ({ idsToremove }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isError, error, isSuccess, isLoading, status, data } =
    useMutation(deleteTask, {
      onSuccess: () => {
        // Invalidates cache and refetch
        queryClient.invalidateQueries("tasks");
      },
    });

  useEffect(() => {
    if (isSuccess) {
      message.success("Task(s) deleted successfully!");
    }

    if (isError) {
      message.error(error.response.data.message);
    }
  }, [isLoading, isSuccess, status]);

  const bulkDelete = () => {
    mutate({
      ids: idsToremove,
    });

    navigate("/");
  };

  const handleLogout = () => {
    removeToken();
  };

  const isLogin = !!getToken();
  const noTaskSelected = idsToremove?.length;
  const disabled = !noTaskSelected;

  return (
    <>
      <Row justify={"space-between"} bg={"white"} color={"black"}>
        <Row>
          {isLogin && <Item to="/">Home</Item>}
          {isLogin && <Item to="/create-task">Create task</Item>}
          {isLogin && (
            <Item to="/" onClick={bulkDelete} disabled={disabled}>
              Delete task(s)
            </Item>
          )}
        </Row>
        <Row>
          {isLogin || <Item to="/login">Login</Item>}
          {isLogin && (
            <Item to="/login" onClick={handleLogout}>
              Logout
            </Item>
          )}
          {isLogin || <Item to="/register">Register</Item>}
        </Row>
      </Row>
    </>
  );
};
