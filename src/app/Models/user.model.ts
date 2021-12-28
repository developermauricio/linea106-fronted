export interface UserModel {
  id?: number;
  identificacion: string;
  name: string;
  last_name: string;
  email: string;
  email_verified_at?: string;
  created_at?: string;
  updated_at?: string;
  rol: "Administrador" | "Psicólogo";
}
