import AuthContext from "./AuthContext";
import { User } from "@/types";
import useLocalstorage from "@/hooks/useLocalstorage";
import { RegisterUserData } from "@/form-schema/registerSchema";

export default function AuthProvider({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const [users, setUsers] = useLocalstorage<User[]>("users", [] as User[]);
	const [user, setUser] = useLocalstorage<User>("user", {} as User);

	function handleRegister(userData: Omit<RegisterUserData, "confirmPassword">): boolean {
		const isUserExist = users.some((user) => user.email === userData.email);

		if (isUserExist) {
			return false;
		}

		const newUser: User = {
			id: new Date().getTime(),
			name: userData.name,
			email: userData.email,
			password: userData.password,
			createdAt: new Date().toUTCString(),
			updatedAt: new Date().toUTCString(),
		};
		setUsers((prev) => [...prev, newUser]);
		return true;
	}

	function handleLogin(email: string, password: string): HandleLoginResponse {
		const response: HandleLoginResponse = {
			isValidEmail: false,
			isValidPassword: false,
		}
		const isUserExist = users.find(u => u.email === email);
		
		if (isUserExist) {
			response.isValidEmail = true;

			if (isUserExist.password === password) {
				response.isValidPassword = true;
				setUser(isUserExist!);
			}
		}

		return response;
	}

	function handleLogout() {
		setUser({} as User);
	}

	return (
		<AuthContext.Provider value={{ user, handleRegister, handleLogin, handleLogout }}>
			{children}
		</AuthContext.Provider>
	);
}

export interface HandleLoginResponse {
	isValidEmail: boolean;
	isValidPassword: boolean;
}