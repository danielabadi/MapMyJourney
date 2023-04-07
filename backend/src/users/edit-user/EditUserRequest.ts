export type EditUserRequest = {
    name: string;
    birthdate: string;
    description: string;
    password: string;
    confirmPassword: string;
    newPassword?: string;
};
