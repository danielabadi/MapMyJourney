import { useMutation } from "@tanstack/react-query";
import AuthService from "../AuthService";

const useRegister = () => {
  return useMutation(AuthService.register);
};

export default useRegister;
