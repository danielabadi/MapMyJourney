import { LoginRequestDto } from "../../types/auth/LoginRequestDto";
import apiClient from "../apiClient";

const login = async (body: LoginRequestDto) => {
    const response = await apiClient.post("/login", body, {withCredentials: true});
    return response.data;
};
  
const AuthService = {
    login,
};

export default AuthService;