import axios from "axios";
import { NextPage, NextPageContext } from "next";
import { useEffect } from "react";

import AddDiscipline from "components/management/Disciplines/Add";
import DetailsDiscipline from "components/management/Disciplines/Details";
import DeleteDiscipline from "components/management/Disciplines/Delete";
import EditDiscipline from "components/management/Disciplines/Edit";
import ListDiscipline from "components/management/Disciplines/List";
import useDiscipline from "hooks/useDiscipline";
import PagesLayout from "layouts/PagesLayout";

const Disciplines: NextPage = () => {
  const { operation, toggleOperation } = useDiscipline();

  useEffect(() => {
    toggleOperation("list");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PagesLayout>
      <AddDiscipline show={operation === "add"} />
      <ListDiscipline show={operation === "list"} />
      <DetailsDiscipline show={operation === "details"} />
      <EditDiscipline show={operation === "edit"} />
      <DeleteDiscipline show={operation === "delete"} />
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

export default Disciplines;
