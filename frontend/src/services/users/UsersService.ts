import apiClient from "../apiClient";

const getUserData = async () => {
    const response = await apiClient.get("/users", {
        withCredentials: true,
    });
    return response.data;
};

const UsersService = {
    getUserData,
};

export default UsersService;

