import { NextPage } from "next";
import UsersActions from "components/Users/Actions";
import PagesLayout from "layouts/PagesLayout";
import AddUser from "components/Users/Add";
import useConfig from "hooks/useConfig";

const Users: NextPage = () => {
  const { operation } = useConfig();
  return (
    <PagesLayout>
      <UsersActions show={operation === "list"} />
      <AddUser show={operation === "add"} />
    </PagesLayout>
  );
};

export default Users;
