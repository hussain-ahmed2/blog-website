import { RegisterUserData } from "@/form-schema/registerSchema";
import { User } from "@/types";
import { createContext } from "react";
import { HandleLoginResponse } from "./AuthProvider";

export interface AuthContextType {
	user: User;
    handleRegister: (userData: Omit<RegisterUserData, "confirmPassword">) => boolean;
    handleLogin: (email: string, password: string) => HandleLoginResponse;
    handleLogout: () => void;
    getUserById: (id: number) => User | undefined;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default AuthContext;
