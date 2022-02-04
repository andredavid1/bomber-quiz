import { NextPage } from "next";
import Head from "next/head";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

import Content from "components/Content";
import Footer from "components/Footer";
import Header from "components/Header";
import Loading from "components/Loading";
import useConfig from "hooks/useConfig";

import { Container } from "./styles";
import "react-toastify/dist/ReactToastify.css";
import QuizContainer from "components/QuizContainer";

interface IQuizLayoutProps {
  children: ReactNode;
}

const QuizLayout: NextPage<IQuizLayoutProps> = ({ children }) => {
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
      <QuizContainer>{children}</QuizContainer>
      <ToastContainer position="top-right" />
      <Loading show={loading} />
      <Footer />
    </Container>
  );
};

export default QuizLayout;
