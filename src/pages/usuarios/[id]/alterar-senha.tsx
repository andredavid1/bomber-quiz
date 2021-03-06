import axios from "axios";
import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";

import ChangePassword from "components/management/Users/ChangePassword";
import PagesLayout from "layouts/PagesLayout";

const ChangePasswordPage: NextPage = () => {
  const router = useRouter();

  const { id } = router.query;
  const idLogged = id ? id.toString() : "";

  return (
    <PagesLayout>
      <ChangePassword id={idLogged} />
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

export default ChangePasswordPage;
