"use client";

import AuthProvider from "./AuthProvider";

export default function RootProvider({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<AuthProvider>
			{children}
		</AuthProvider>
	);
}
