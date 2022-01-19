import useConfig from "hooks/useConfig";
import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiMoon, FiSun } from "react-icons/fi";
import { Brand, Container, Menu, ToggleShowMenu } from "./styles";

const Header = () => {
  const { theme, toggleTheme } = useConfig();
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <Container>
      <Brand>
        <Link href="/" passHref>
          <a>BomberQuiz</a>
        </Link>
      </Brand>

      <Menu show={showMenu}>
        <li>
          <Link href="/usuarios" passHref>
            <a>Usuários</a>
          </Link>
        </li>
        <li>
          <button type="button" onClick={toggleTheme}>
            {theme.title === "light" ? <FiMoon /> : <FiSun />}
          </button>
        </li>
      </Menu>

      <ToggleShowMenu type="button" onClick={() => setShowMenu(!showMenu)}>
        <FiMenu />
      </ToggleShowMenu>
    </Container>
  );
};

export default Header;
