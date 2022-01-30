import { NextPage } from "next";
import Head from "next/head";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

import Loading from "components/Loading";
import useConfig from "hooks/useConfig";

import { Container, FormContainer } from "./styles";
import "react-toastify/dist/ReactToastify.css";

interface ILoginLayoutProps {
  children: ReactNode;
}

const LoginLayout: NextPage<ILoginLayoutProps> = ({ children }) => {
  const { loading } = useConfig();

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
      <ToastContainer position="top-right" />
      <Loading show={loading} />
    </Container>
  );
};

export default LoginLayout;
