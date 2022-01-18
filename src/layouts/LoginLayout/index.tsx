import { NextPage } from "next";
import Head from "next/head";
import { ReactNode } from "react";
import { Container, FormContainer } from "./styles";

interface ILoginLayoutProps {
  children: ReactNode;
}

const LoginLayout: NextPage<ILoginLayoutProps> = ({ children }) => {
  return (
    <Container>
      <Head>
        <title>BomberQuiz</title>
        <meta
          name="description"
          content="Quiz de matérias de bombeiros de Goiás"
        />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FormContainer>{children}</FormContainer>
    </Container>
  );
};

export default LoginLayout;
