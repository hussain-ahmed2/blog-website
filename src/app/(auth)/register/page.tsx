"use client";

import registerSchema, { RegisterUserData } from "@/form-schema/registerSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthContext from "@/contexts/AuthContext";
import { useContext } from "react";
import { redirect } from "next/navigation";

export default function page() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(registerSchema),
	});

	const { handleRegister } = useContext(AuthContext);

	function onSubmit(data: RegisterUserData) {
		const isValid = handleRegister(data);

		if (isValid) {
			redirect("/login");
		}
	}

	return (
		<div className="gird place-content-center h-[calc(100vh-4rem)] px-5">
			<div className="max-w-3xl mx-auto border-gray-300 rounded-xl shadow bg-white my-5">
				<h1 className="text-center py-5 mx-8 text-3xl font-bold border-b">
					Register
				</h1>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-4 p-8"
				>
					<div className="flex flex-col gap-1">
						<div className="flex gap-4 justify-between items-center">
							<label htmlFor="email">Name</label>
							{
								errors.name && <span className="text-rose-500 text-sm">{errors.name.message}</span>
							}
						</div>

						<input
							{...register("name")}
							className={`w-full border rounded p-2 outline-none ${errors.name ? "border-rose-400" : "focus:border-teal-400"} `}
							id="name"
							placeholder="Enter your name"
						/>
					</div>
					<div className="flex flex-col gap-1">
						<div className="flex gap-4 justify-between items-center">
							<label htmlFor="email">Email</label>
							{
								errors.email && <span className="text-rose-500 text-sm">{errors.email.message}</span>
							}
						</div>
						<input
							{...register("email")}
							className={`border rounded p-2 outline-none ${errors.email ? "border-rose-400" : "focus:border-teal-400"} `}
							id="email"
							placeholder="Enter your email"
						/>
					</div>
					<div className="flex flex-col gap-1">
						<div className="flex gap-4 justify-between items-center">
							<label htmlFor="password">Password</label>
							{
								errors.password && <span className="text-rose-500 text-sm">{errors.password.message}</span>
							}
						</div>
						<input
							{...register("password")}
							className={`border rounded p-2 outline-none ${errors.password ? "border-rose-400" : "focus:border-teal-400"} `}
							type="password"
							id="password"
							placeholder="Enter your password"
						/>
					</div>
					<div className="flex flex-col gap-1">
						<div className="flex gap-4 justify-between items-center">
							<label htmlFor="password">Confirm Password</label>
							{
								errors.confirmPassword && <span className="text-rose-500 text-sm">{errors.confirmPassword.message}</span>
							}
						</div>
						<input
							{...register("confirmPassword")}
							className={`border rounded p-2 outline-none ${errors.confirmPassword ? "border-rose-400" : "focus:border-teal-400"} `}
							type="password"
							id="confirmPassword"
							placeholder="Repeat your password"
						/>
					</div>
					<button
						className="py-2 rounded bg-teal-500 text-white font-medium hover:bg-teal-600"
						type="submit"
					>
						Register
					</button>
				</form>
			</div>
		</div>
	);
}
