import { useMutation } from "@tanstack/react-query";
import UsersService from "../UsersService";

const useEdit = () => {
  return useMutation(UsersService.edit);
};

export default useEdit;
