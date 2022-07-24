import styled from "styled-components";

const Container = styled.div`
  margin: 50px auto;
  max-width: 900px;

  @media (max-width: 375px) {
    width: 90vw;
  }

  @media (min-width: 768px) {
    width: 80vw;
  }
`;

const Wrapper = styled.div`
  margin: 30px 50px;
`;

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

export { Container, Wrapper, Row, Label };
