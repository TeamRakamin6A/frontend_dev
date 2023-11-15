import { useEffect } from "react";
import { login } from "../fetching/user";

const Login = () => {
  useEffect(() => {
    const fetchLogin = async () => {
      await login({
        emailOrUsername: "admin",
        password: "admin",
      });
    };

    fetchLogin();
  }, []);
  return <div>Login</div>;
};

export default Login;
