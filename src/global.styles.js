import styled from "styled-components";

const Row = styled.div`
  display: flex;
  justify-content: ${(props) => props.justify};
  background: ${(props) => props.bg};
  color: ${(props) => props.color};
  flex-wrap: ${(props) => props.wrap};
`;

const Label = styled.label`
  color: white;
`;

export { Row, Label };
