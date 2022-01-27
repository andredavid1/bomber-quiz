import axios from "axios";
import type { NextPage, NextPageContext } from "next";
import { useEffect } from "react";

import useAuth from "hooks/useAuth";
import PagesLayout from "layouts/PagesLayout";

const Home: NextPage = () => {
  const { userLogged, logout, verify } = useAuth();

  useEffect(() => {
    verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PagesLayout>
      <h2>Página Inicial</h2>
      <h3>Usuário logado: {userLogged?.name}</h3>
      <button onClick={logout}>Sair</button>
    </PagesLayout>
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
