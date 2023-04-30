import { useMutation } from "@tanstack/react-query";
import AuthService from "../AuthService";

const useLogout = () => {
  return useMutation(AuthService.logout);
};

export default useLogout;
