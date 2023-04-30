import { useMutation } from "@tanstack/react-query";
import AuthService from "../AuthService";

const useLogin = () => {
  return useMutation(AuthService.login);
};

export default useLogin;
