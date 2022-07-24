import React from "react";
import { Navbar } from "./navbar";
import { Container } from "../styles";

export const Layout = ({ idsToremove, children }) => {
  return (
    <Container>
      <Navbar idsToremove={idsToremove} />
      {children}
    </Container>
  );
};
