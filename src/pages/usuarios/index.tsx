import axios from "axios";
import { NextPage, NextPageContext } from "next";

import AddUser from "components/management/Users/Add";
import DetailsUser from "components/management/Users/Details";
import DeleteUser from "components/management/Users/Delete";
import EditUser from "components/management/Users/Edit";
import ListUser from "components/management/Users/List";
import useUser from "hooks/useUser";
import PagesLayout from "layouts/PagesLayout";
import { useEffect } from "react";

const Users: NextPage = () => {
  const { operation, toggleOperation } = useUser();

  useEffect(() => {
    toggleOperation("list");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PagesLayout>
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
