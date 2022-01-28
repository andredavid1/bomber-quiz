import axios from "axios";
import { NextPage, NextPageContext } from "next";

import UsersActions from "components/Users/Actions";
import AddUser from "components/Users/Add";
import DetailsUser from "components/Users/Details";
import DeleteUser from "components/Users/Delete";
import EditUser from "components/Users/Edit";
import ListUser from "components/Users/List";
import useUser from "hooks/useUser";
import PagesLayout from "layouts/PagesLayout";

const Users: NextPage = () => {
  const { operation } = useUser();

  return (
    <PagesLayout>
      <UsersActions show={operation === "list"} />
      <AddUser show={operation === "add"} />
      <ListUser show={operation === "list"} />
      <DetailsUser show={operation === "details"} />
      <EditUser show={operation === "edit"} />
      <DeleteUser show={operation === "delete"} />
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

export default Users;
