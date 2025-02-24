"use client";

import AuthContext from "@/contexts/AuthContext";
import Link from "next/link";
import { useContext } from "react";

export default function Navbar() {
	const { user, handleLogout } = useContext(AuthContext);
	return (
		<nav className="fixed top-0 left-0 right-0 px-5 w-full border-b bg-teal-500 text-white">
			<div className="flex justify-between items-center min-h-14 max-w-5xl mx-auto">
				<Link className="font-bold text-2xl" href="/">
					Logo
				</Link>
				<div className="flex gap-8 items-center">
					<Link className="hover:underline" href="/posts">
						Posts
					</Link>
					{user.id ? (
						<>
							<Link className="hover:underline" href="user">
								{user.name}
							</Link>
							<button onClick={handleLogout} className="px-4 py-1 rounded bg-rose-500 hover:bg-rose-600 transition-colors">
								Logout
							</button>
						</>
					) : (
						<>
							<Link className="hover:underline" href="/login">
								Login
							</Link>
							<Link className="hover:underline" href="/register">
								Register
							</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	);
}
