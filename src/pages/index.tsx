import axios from "axios";
import useAuth from "hooks/useAuth";
import useConfig from "hooks/useConfig";
import type { NextPage, NextPageContext } from "next";
import { useEffect } from "react";

const Home: NextPage = () => {
  const { theme, toggleTheme } = useConfig();
  const { userLogged, logout, verify } = useAuth();

  useEffect(() => {
    verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Página Inicial</h1>
      <h2>Usuário logado: {userLogged?.name}</h2>
      <button onClick={toggleTheme}>
        {theme.title === "light" ? "Tema Dark" : "Tema Light"}
      </button>
      <button onClick={logout}>Sair</button>
    </div>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  let apiUrl = process.env.API_URL;

  if (!apiUrl) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  if (ctx.req) {
    const cookie = ctx.req.headers.cookie;

    if (cookie) {
      const response = await axios({
        method: "POST",
        data: { token: cookie },
        url: `${apiUrl}/auth/verify`,
        headers: ctx.req ? { cookie } : undefined,
      });

      if (!response.data.success) {
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }
    } else {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
  }

  return {
    props: {},
  };
}

export default Home;
