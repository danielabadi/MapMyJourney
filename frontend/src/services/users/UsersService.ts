import { UserPerfilRequestDto } from "../../types/users/UserPerfilRequestDto";
import apiClient from "../apiClient";

const edit = async (body: UserPerfilRequestDto) => {
    const response = await apiClient.put("/users", body, {
      withCredentials: true,
    });
    return response.data;
  };

const getUserData = async () => {
    const response = await apiClient.get("/users", {
        withCredentials: true,
    });
    return response.data;
};

const UsersService = {
    edit,
    getUserData,
};

export default UsersService;

