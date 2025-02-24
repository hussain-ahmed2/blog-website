"use client";

import AuthContext from "@/contexts/AuthContext";
import loginSchema, { LoginUserData } from "@/form-schema/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

export default function page() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm({
		resolver: zodResolver(loginSchema),
	});

	const { handleLogin } = useContext(AuthContext);

	function onSubmit(data: LoginUserData) {
		const isValid = handleLogin(data.email, data.password);

		if (!isValid.isValidEmail) {
			setError("email", { message: "This email is not registered" });
			return;
		}

		if (!isValid.isValidPassword) {
			setError("password", { message: "Invalid password" });
			return;
		}

		redirect("/user");
	}

	return (
		<div className="gird place-content-center h-[calc(100vh-4rem)] px-5">
			<div className="max-w-3xl mx-auto border-gray-300 rounded-xl shadow bg-white">
				<h1 className="text-center py-5 mx-8 text-3xl font-bold border-b">
					Login
				</h1>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-4 p-8"
				>
					<div className="flex flex-col gap-1">
						<div className="flex gap-4 items-center justify-between">
							<label htmlFor="email">Email</label>
							{errors.email && (
								<span className="text-rose-500 text-sm">
									{errors.email.message}
								</span>
							)}
						</div>
						<input
							className={`border rounded p-2 outline-none ${
								errors.email
									? "border-rose-400"
									: "focus:border-teal-400"
							} `}
							{...register("email")}
							id="email"
							placeholder="Enter your email"
						/>
					</div>
					<div className="flex flex-col gap-1">
						<div className="flex gap-4 items-center justify-between">
							<label htmlFor="password">Password</label>
							{errors.password && (
								<span className="text-rose-500 text-sm">
									{errors.password.message}
								</span>
							)}
						</div>
						<input
							className={`border rounded p-2 outline-none ${
								errors.password
									? "border-rose-400"
									: "focus:border-teal-400"
							} `}
							type="password"
							{...register("password")}
							id="password"
							placeholder="Enter your password"
						/>
					</div>
					<button
						className="py-2 rounded bg-teal-500 text-white font-medium hover:bg-teal-600"
						type="submit"
					>
						Login
					</button>
				</form>
			</div>
		</div>
	);
}
