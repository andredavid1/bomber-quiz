import { ReactNode } from "react";
import { Container } from "./styles";

interface IContentProps {
  children: ReactNode;
}

const Content = ({ children }: IContentProps) => {
  return <Container>{children}</Container>;
};

export default Content;
