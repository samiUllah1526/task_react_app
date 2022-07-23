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

export { Container, Wrapper };
