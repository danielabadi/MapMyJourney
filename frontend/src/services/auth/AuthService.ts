import { LoginRequestDto } from "../../types/auth/LoginRequestDto";
import { RegisterRequestDto } from "../../types/auth/RegisterRequestDto";
import apiClient from "../apiClient";

const login = async (body: LoginRequestDto) => {
    const response = await apiClient.post("/login", body, {withCredentials: true});
    return response.data;
};

const register = async (body: RegisterRequestDto) => {
    const response = await apiClient.post("/users", body);
    return response.data;
  };
  
const AuthService = {
    login,
    register,
};

export default AuthService;