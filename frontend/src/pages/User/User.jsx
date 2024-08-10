import Header from "../../layout/header";
import { Profile } from "../../components/user_comp";
import useAuth from "../../context/AuthContext";

const User = () => {
  const { Auth } = useAuth();
  // console.log(Auth);

  return (
    <div className="m-[15px] sm:m-[30px] flex flex-col gap-9 min-h-screen">
      <Header title={"My Profile"} />
      <Profile userData={Auth} />
    </div>
  );
};

export default User;
