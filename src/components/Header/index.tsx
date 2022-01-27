/* eslint-disable @next/next/no-img-element */
import useAuth from "hooks/useAuth";
import useConfig from "hooks/useConfig";
import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiMoon, FiSun } from "react-icons/fi";
import profileImg from "../../../public/profile.png";

import {
  Brand,
  Container,
  Menu,
  ToggleShowMenu,
  UserProfilerContainer,
} from "./styles";

const Header = () => {
  const { userLogged, logout } = useAuth();
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

      <UserProfilerContainer>
        <img src="/profile.png" alt="perfil do usuário" />
        <nav>
          <Link href="/" passHref>
            <a>Perfil do Usuário</a>
          </Link>
          <button onClick={logout}>Sair</button>
        </nav>
      </UserProfilerContainer>

      <ToggleShowMenu type="button" onClick={() => setShowMenu(!showMenu)}>
        <FiMenu />
      </ToggleShowMenu>
    </Container>
  );
};

export default Header;
