import React from "react";
import styled from "styled-components";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Row } from "../global.styles";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "antd";

const Wrapper = styled.div`
  width: 250px;
  height: 200px;
  background: #6c7fab;
  border-radius: 10px;
  margin: 10px 10px;
  padding: 30px 20px;
`;

const Title = styled.div`
  // text-align: center;
  color: Black;
  font-weight: bold;
`;

const Description = styled.div`
  margin: 20px 0px;
  color: white;
`;

export const Task = ({ id, title, description, setIDs }) => {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/edit-task/${id}`);
  };

  const handleDelete = () => {};

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
    console.log(e.target.value);

    e.target.checked && setIDs((prev) => [...prev, parseInt(e.target.value)]);
    !e.target.checked &&
      setIDs((prev) => [...prev.filter((item) => item != e.target.value)]);
  };
  return (
    <Wrapper>
      <Row justify={"space-between"}>
        <Title>{title}</Title>
        <div>
          <EditOutlined style={{ color: "white" }} onClick={handleEdit} />
          <Checkbox
            valuePropName="checked"
            value={id}
            style={{ lineHeight: "32px", marginLeft: 5 }}
            onChange={onChange}
          ></Checkbox>
        </div>
      </Row>

      <Description>{description}</Description>
    </Wrapper>
  );
};
