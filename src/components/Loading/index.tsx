import { NextPage } from "next";

import { Container } from "./styles";

interface ILoadingProps {
  show: boolean;
}

const Loading: NextPage<ILoadingProps> = ({ show }) => {
  return (
    <Container show={show}>
      <p>Carregando...</p>
    </Container>
  );
};

export default Loading;
