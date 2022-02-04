import { ReactNode } from "react";
import { Container } from "./styles";

interface IQuizContainerProps {
  children: ReactNode;
}

const QuizContainer = ({ children }: IQuizContainerProps) => {
  return <Container>{children}</Container>;
};

export default QuizContainer;
