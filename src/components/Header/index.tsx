import Link from "next/link";
import { Container } from "./styles";

const Header = () => {
  return (
    <Container>
      <h1>
        <Link href="/" passHref>
          <a>BomberQuiz</a>
        </Link>
      </h1>
    </Container>
  );
};

export default Header;
