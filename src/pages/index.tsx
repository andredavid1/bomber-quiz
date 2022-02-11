import axios from "axios";
import type { NextPage, NextPageContext } from "next";

import HomeComponent from "components/Home";
import useAuth from "hooks/useAuth";
import PagesLayout from "layouts/PagesLayout";

const Home: NextPage = () => {
  const { userLogged, logout } = useAuth();

  return (
    <PagesLayout>
      <HomeComponent />
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
      try {
        await axios({
          method: "POST",
          data: { token: cookie },
          url: `${apiUrl}/auth/verify`,
          headers: ctx.req ? { cookie } : undefined,
        });
      } catch (err: any) {
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
