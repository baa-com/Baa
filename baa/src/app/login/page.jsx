"use client";

import {
	Container,
	HStack,
	Button,
	Input,
	Stack,
	Center,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import Image from "next/image";
import authPNG from "../public/auth-background.png";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = handleSubmit(async (data) => {
		try {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`,
				{
					username: data.username,
					password: data.password,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			localStorage.setItem("token", response.data.token);

			if (response.status >= 200 && response.status < 300) {
				alert("Login successful!");
				router.push("/home");
			} else {
				console.error("Login error:", response);
				alert("Login failed.");
			}
		} catch (error) {
			console.error("Error during login:", error);
			alert("An error occurred while logging in.");
		}
	});

	return (
		<Container m="0" p="0" width="100vw">
			<HStack width="100%" justify="space-between" height="100vh">
				<Container
					maxW="50%"
					height="100%"
					display="flex"
					justifyContent="center"
					alignItems="center"
				>
					<Center>
						<form onSubmit={onSubmit}>
							<Stack gap="4" align="flex-start" maxW="sm">
								<Field
									label="Username"
									invalid={!!errors.username}
									errorText={errors.username?.message}
								>
									<Input
										{...register("username", {
											required: "Username is required",
										})}
									/>
								</Field>

								<Field
									label="Password"
									invalid={!!errors.password}
									errorText={errors.password?.message}
								>
									<PasswordInput
										{...register("password", {
											required: "Password is required",
										})}
									/>
								</Field>

								<Button type="submit">Login</Button>
							</Stack>
						</form>
					</Center>
				</Container>
				<Image
					src={authPNG}
					alt="auth background"
					style={{
						height: "100vh",
						width: "40vw",
						objectFit: "cover",
					}}
				/>
			</HStack>
		</Container>
	);
}
