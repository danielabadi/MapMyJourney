export interface UserPerfilRequestDto {
  name: string;
  email: string;
  birthdate: string;
  description?: string;
  password: string;
  newPassword?: string;
  confirmPassword?: string;
}
