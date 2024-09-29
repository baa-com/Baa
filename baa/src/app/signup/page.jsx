"use client";

import {
	Container,
	HStack,
	Button,
	Input,
	Stack,
	Group,
	Show,
	Center,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import {
	StepsCompletedContent,
	StepsContent,
	StepsItem,
	StepsList,
	StepsNextTrigger,
	StepsPrevTrigger,
	StepsRoot,
} from "@/components/ui/steps";
import { PasswordInput } from "@/components/ui/password-input";
import Image from "next/image";
import authPNG from "../public/auth-background.png";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignUp() {
	const [step, setStep] = useState(1);
	const router = useRouter();

	const {
		register,
		resetField,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const handleStep = (e) => {
		e.preventDefault();
		if (step === 1) {
			setStep(2);
		} else {
			setStep(1);
		}
		resetField("username");
		setValue("username", "");
	};

	const calculateAge = (birthDate) => {
		const today = new Date();
		const birth = new Date(birthDate);
		let age = today.getFullYear() - birth.getFullYear();
		const monthDiff = today.getMonth() - birth.getMonth();

		if (
			monthDiff < 0 ||
			(monthDiff === 0 && today.getDate() < birth.getDate())
		) {
			age--;
		}
		return age;
	};

	const onSubmit = handleSubmit(async (data) => {
		try {
			const signupResponse = await axios.post(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signup`,
				{
					firstName: data.firstName,
					lastName: data.lastName,
					email: data.email,
					username: data.username,
					password: data.password,
					birthDate: data.birthDate,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			const loginResponse = await axios.post(
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

			localStorage.setItem("token", loginResponse.data.token);

			if (
				signupResponse.status >= 200 &&
				signupResponse.status < 300 &&
				loginResponse.status >= 200 &&
				loginResponse.status < 300
			) {
				alert("Registration successful!");
				router.push("/home");
			} else {
				console.error("Registration error:", signupResponse);
				alert("Registration failed.");
			}
		} catch (error) {
			console.error("Error during registration:", error);
			alert("An error occurred while registering.");
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
							<Show
								when={step === 2}
								fallback={
									<Stack gap="4" align="flex-start" maxW="sm">
										<Field
											label="First name"
											invalid={!!errors.firstName}
											errorText={errors.firstName?.message}
										>
											<Input
												{...register("firstName", {
													required: "First name is required",
												})}
											/>
										</Field>
										<Field
											label="Last name"
											invalid={!!errors.lastName}
											errorText={errors.lastName?.message}
										>
											<Input
												{...register("lastName", {
													required: "Last name is required",
												})}
											/>
										</Field>
										<Field
											label="Email"
											invalid={!!errors.email}
											errorText={errors.email?.message}
										>
											<Input
												{...register("email", {
													required: "Email is required",
												})}
											/>
										</Field>

										<Button onClick={handleStep}>Continue</Button>
									</Stack>
								}
							>
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

									<Field
										label="Date of birth"
										invalid={!!errors.birthDate}
										errorText={errors.birthDate?.message}
									>
										<Input
											type="date" // Use date input for better UX
											{...register("birthDate", {
												required: "Date of birth is required",
												validate: (value) => {
													const age = calculateAge(value);
													return (
														age >= 14 ||
														"You must be at least 14 years old to register."
													);
												},
											})}
										/>
									</Field>

									<Button type="submit">Submit</Button>
								</Stack>
							</Show>
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
