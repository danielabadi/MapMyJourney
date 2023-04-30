import { useQuery } from "@tanstack/react-query";
import UsersService from "../UsersService";

const useGetUserData = () => {
  return useQuery(['getUserData'], UsersService.getUserData, {refetchOnMount: 'always'});
};

export default useGetUserData;