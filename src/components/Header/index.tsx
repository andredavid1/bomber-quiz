import Link from "next/link";
import { useEffect, useState } from "react";
import { FiMenu, FiMoon, FiSun } from "react-icons/fi";

import useAuth from "hooks/useAuth";
import useConfig from "hooks/useConfig";

import { Brand, Container, ListMenu, Menu, ToggleShowMenu } from "./styles";

const Header = () => {
  const { userLogged, verify, logout } = useAuth();
  const { theme, toggleTheme } = useConfig();
  const [showMenu, setShowMenu] = useState<boolean>(false);

  useEffect(() => {
    verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Brand>
        <Link href="/" passHref>
          <a>BomberQuiz</a>
        </Link>
      </Brand>

      <Menu show={showMenu}>
        <ListMenu>
          <li>
            <Link href="/" passHref>
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/usuarios" passHref>
              <a>Usuários</a>
            </Link>
          </li>
          <li>
            <Link href="/materias" passHref>
              <a>Matérias</a>
            </Link>
          </li>
          <li>
            <Link href="/questoes" passHref>
              <a>Questões</a>
            </Link>
          </li>
          <li>
            <a>Perfil</a>
            <ul>
              <li>
                <Link
                  href={`/usuarios/${userLogged?.id}/editar-perfil`}
                  passHref
                >
                  <a>Editar Perfil</a>
                </Link>
              </li>
              <li>
                <Link
                  href={`/usuarios/${userLogged?.id}/alterar-senha`}
                  passHref
                >
                  <a>Alterar Senha</a>
                </Link>
              </li>
              <li>
                <button onClick={logout}>Sair</button>
              </li>
            </ul>
          </li>
          <li>
            <button type="button" onClick={toggleTheme}>
              {theme.title === "light" ? <FiMoon /> : <FiSun />}
            </button>
          </li>
        </ListMenu>
      </Menu>

      <ToggleShowMenu type="button" onClick={() => setShowMenu(!showMenu)}>
        <FiMenu />
      </ToggleShowMenu>
    </Container>
  );
};

export default Header;
