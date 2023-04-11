import { Container } from "@mui/material";

export const CenteredContainer = ({ children, background, refComponent }) => (
  <Container
    maxWidth="xl"
    style={{
      height: "100vh",
      background: background,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
    ref={refComponent}
  >
    {children}
  </Container>
);
