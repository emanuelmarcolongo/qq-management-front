import mockUsers from "@/src/data/datamock";
import CCUsersPage from "./UsersPage";

const UsersPage = () => {
  const userData = mockUsers;
  return <CCUsersPage data={userData} />;
};

export default UsersPage;
