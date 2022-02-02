import axios from "axios";
import { NextPage, NextPageContext } from "next";

import AddQuestion from "components/Questions/Add";
import DetailsQuestion from "components/Questions/Details";
/* import DeleteQuestion from "components/Questions/Delete"; */
import EditQuestion from "components/Questions/Edit";
import ListQuestion from "components/Questions/List";
import useQuestion from "hooks/useQuestion";
import PagesLayout from "layouts/PagesLayout";
import { useEffect } from "react";

const Questions: NextPage = () => {
  const { operation, toggleOperation } = useQuestion();

  useEffect(() => {
    toggleOperation("list");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PagesLayout>
      <AddQuestion show={operation === "add"} />
      <ListQuestion show={operation === "list"} />
      <DetailsQuestion show={operation === "details"} />
      <EditQuestion show={operation === "edit"} />
      {/* <DeleteQuestion show={operation === "delete"} /> */}
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

export default Questions;
