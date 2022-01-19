import { NextPage } from "next";
import Head from "next/head";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import Footer from "components/Footer";
import Header from "components/Header";
import Loading from "components/Loading";
import useConfig from "hooks/useConfig";

import { Container } from "./styles";
import "react-toastify/dist/ReactToastify.css";
import Content from "components/Content";

interface IPagesLayoutProps {
  children: ReactNode;
}

const PagesLayout: NextPage<IPagesLayoutProps> = ({ children }) => {
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
      <Header />
      <Content>{children}</Content>
      <ToastContainer position="top-right" />
      <Loading show={loading} />
      <Footer />
    </Container>
  );
};

export default PagesLayout;
