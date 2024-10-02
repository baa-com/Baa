"use client";

import {
	Container,
	HStack,
	Button,
	Box,
	Input,
	Stack,
	Heading,
	Show,
	Center,
	Image,
	Text,
	Link,
	VStack,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import {
	StepsContent,
	StepsItem,
	StepsList,
	StepsRoot,
} from "@/components/ui/steps";
import { PinInput } from "@/components/ui/pin-input";
import { PasswordInput } from "@/components/ui/password-input";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import NextImage from "next/image";
import axios from "axios";
import HiddenIcon from "../../components/icons/hidden";
import VisibleIcon from "../../components/icons/visible";
import NextLink from "next/link";
import toast, { Toaster, LoaderIcon } from "react-hot-toast";
import SuccessIcon from "../../components/icons/success";
import ErrorIcon from "../../components/icons/error";
import HappyMaskIcon from "../../components/icons/happy-mask";

function StepOne({ setStep, setFirstName, setLastName, setEmail, setPhone }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = handleSubmit((data) => {
		console.log(data.emailOrPhone);
		setStep(1);
		setFirstName(data.firstName);
		setLastName(data.lastName);
		if (
			/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(
				data.emailOrPhone
			)
		) {
			console.log("phone");
			setPhone(data.emailOrPhone);
		} else if (
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.emailOrPhone)
		) {
			console.log("email");
			setEmail(data.emailOrPhone);
		}
	});

	return (
		<form onSubmit={onSubmit}>
			<Stack gap="4">
				<Heading alignSelf="center" fontWeight="bold" size="5xl">
					Create your account
				</Heading>
				<Field
					w="full"
					fontSize="xl"
					label="First name"
					invalid={!!errors.firstName}
					errorText={errors.firstName?.message}
				>
					<Input
						p="25px"
						fontSize="xl"
						borderRadius="50px"
						borderColor="black"
						_dark={{ borderColor: "white" }}
						placeholder="First name"
						_placeholder={{ color: "#BBBBBB" }}
						autoComplete="off"
						{...register("firstName", {
							required: "First name is required",
						})}
					/>
				</Field>
				<Field
					w="full"
					fontSize="xl"
					label="Last name"
					invalid={!!errors.lastName}
					errorText={errors.lastName?.message}
				>
					<Input
						p="25px"
						fontSize="xl"
						borderRadius="50px"
						borderColor="black"
						_dark={{ borderColor: "white" }}
						placeholder="Last name"
						_placeholder={{ color: "#BBBBBB" }}
						autoComplete="off"
						{...register("lastName", {
							required: "Last name is required",
						})}
					/>
				</Field>
				<Field
					w="full"
					fontSize="xl"
					label="Email or Phone Number"
					invalid={!!errors.emailOrPhone}
					errorText={errors.emailOrPhone?.message}
				>
					<Input
						p="25px"
						fontSize="xl"
						borderRadius="50px"
						borderColor="black"
						_dark={{ borderColor: "white" }}
						placeholder="Email or Phone Number"
						_placeholder={{ color: "#BBBBBB" }}
						autoComplete="off"
						{...register("emailOrPhone", {
							required: "Email or phone number is required",
							pattern: {
								value:
									/(^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$)|(^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$)/,
								message: "Please enter a valid email or phone number",
							},
						})}
					/>
				</Field>
				<Button
					type="submit"
					w="full"
					p="25px"
					mt="8"
					fontSize="xl"
					borderRadius="50px"
					bg="#40396E"
					_dark={{ bg: "#958EC4" }}
				>
					Continue
				</Button>
				<Text alignSelf="center" fontSize="xl">
					Already have an account?{" "}
					<Link asChild fontWeight="semibold">
						<NextLink href="/login">Log in</NextLink>
					</Link>
				</Text>
			</Stack>
		</form>
	);
}

export default function SignUp() {
	const [step, setStep] = useState(0);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [pin, setPin] = useState(["", "", "", ""]);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

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
		console.log(email);
		console.log(phone);
		console.log(data.birthDate);

		toast.promise(
			axios
				.post(
					`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signup`,
					{
						firstName: firstName,
						lastName: lastName,
						email: email,
						phoneNumber: phone,
						username: data.username,
						password: data.password,
						birthDate: data.birthDate,
					},
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				)
				.catch((error) => {
					console.error("Error during account creation:", error);
					const errorMessage = error?.response?.data?.error;

					if (errorMessage?.includes("duplicate key error")) {
						throw new Error("Login failed. Username taken.");
					} else {
						throw new Error("Login failed. Please try again.");
					}
				})
				.then((response) => {
					router.push("/home");
				}),
			{
				loading: "Creating your account... Please wait.",
				success: "Account created successfully! Welcome!",
				error: (e) => e.message,
			}
		);
	});

	return (
		<StepsRoot step={step} count={2}>
			<HStack width="dvw" height="dvh" gap="0">
				<Center w="60%" h="100%">
					<Stack gap="8" maxW="md">
						<StepsList>
							<StepsItem
								index={0}
								onClick={() => {
									setStep(0);
								}}
							/>
							<StepsItem index={1} />
						</StepsList>
						<StepsContent index={0}>
							<StepOne
								setStep={setStep}
								setFirstName={setFirstName}
								setLastName={setLastName}
								setEmail={setEmail}
								setPhone={setPhone}
							/>
						</StepsContent>
						<StepsContent index={1}>
							<form onSubmit={onSubmit}>
								<Stack gap="4">
									<Heading alignSelf="center" fontWeight="bold" size="5xl">
										Create your account
									</Heading>
									<Field
										w="full"
										fontSize="xl"
										label="Username"
										invalid={!!errors.username}
										errorText={errors.username?.message}
									>
										<Input
											p="25px"
											fontSize="xl"
											borderRadius="50px"
											borderColor="black"
											_dark={{ borderColor: "white" }}
											placeholder="Enter your username"
											_placeholder={{ color: "#BBBBBB" }}
											autoComplete="off"
											{...register("username", {
												required: "Username is required",
											})}
										/>
									</Field>
									<Field
										w="full"
										fontSize="xl"
										label="Password"
										invalid={!!errors.password}
										errorText={errors.password?.message}
									>
										<PasswordInput
											p="25px"
											fontSize="xl"
											borderRadius="50px"
											borderColor="black"
											_dark={{ borderColor: "white" }}
											placeholder="Enter your password"
											_placeholder={{ color: "#BBBBBB" }}
											visibilityIcon={{
												off: <VisibleIcon boxSize="32px" color="black" />,
												on: <HiddenIcon boxSize="32px" color="black" />,
											}}
											{...register("password", {
												required: "Password is required",
											})}
										/>
									</Field>
									<Field
										w="full"
										fontSize="xl"
										label="Date of birth"
										invalid={!!errors.birthDate}
										errorText={errors.birthDate?.message}
									>
										<Input
											p="25px"
											fontSize="xl"
											borderRadius="50px"
											borderColor="black"
											_dark={{ borderColor: "white" }}
											autoComplete="off"
											type="date"
											{...register("birthDate", {
												required: "Date of birth is required",
												validate: (value) =>
													calculateAge(value) >= 14 ||
													"You must be at least 14 years old to register.",
											})}
										/>
									</Field>
									<Button
										type="submit"
										w="full"
										p="25px"
										mt="8"
										fontSize="xl"
										borderRadius="50px"
										bg="#40396E"
										_dark={{ bg: "#958EC4" }}
									>
										Sign Up
									</Button>
									<Text alignSelf="center" fontSize="xl">
										Already have an account?{" "}
										<Link asChild fontWeight="semibold">
											<NextLink href="/login">Log in</NextLink>
										</Link>
									</Text>
								</Stack>
							</form>
						</StepsContent>
						{/* <StepsContent index={2}>
							<form onSubmit={onSubmit}>
								<Stack gap="8">
									<Heading alignSelf="center" fontWeight="bold" size="4xl">
										Verify your {email ? "email" : "phone number"}
									</Heading>
									<Field w="full" fontSize="xl">
										<PinInput
											attached
											alignSelf="center"
											placeholder=""
											borderRadius="50px"
											borderColor="black"
											fontSize="xl"
										/>
									</Field>
									<Button
										type="submit"
										w="full"
										p="25px"
										mt="8"
										fontSize="xl"
										borderRadius="50px"
										bg="#40396E"
									>
										Verify
									</Button>
									<Text alignSelf="center" fontSize="xl">
										Didn't receive the code?{" "}
										<Link asChild fontWeight="semibold">
											<NextLink href="/signup">Resend code</NextLink>
										</Link>
									</Text>
								</Stack>
							</form>
						</StepsContent> */}
					</Stack>
				</Center>
				<Image asChild width="40%" height="dvh">
					<NextImage
						src="/auth-background.svg"
						alt=""
						width="600"
						height="1024"
					/>
				</Image>
			</HStack>
			<Toaster
				toastOptions={{
					loading: {
						duration: 5000,
						style: {
							minWidth: "fit-content",
							background: "white",
							color: "black",
							fontSize: "18px",
							paddingLeft: "25px",
							paddingRight: "25px",
							borderRadius: "50px",
						},
						icon: (
							<LoaderIcon
								primary="#2463EB"
								secondary="white"
								style={{
									width: "18px",
									height: "18px",
								}}
							/>
						),
					},
					success: {
						duration: 5000,
						style: {
							minWidth: "fit-content",
							background: "white",
							color: "#17A34A",
							fontSize: "18px",
							paddingLeft: "25px",
							paddingRight: "25px",
							borderRadius: "50px",
						},
						icon: <SuccessIcon boxSize="24px" color="#17A34A" />,
					},
					error: {
						duration: 5000,
						style: {
							minWidth: "fit-content",
							background: "white",
							color: "#DC2625",
							fontSize: "18px",
							paddingLeft: "25px",
							paddingRight: "25px",
							borderRadius: "50px",
						},
						icon: <ErrorIcon boxSize="24px" color="#DC2625" />,
					},
				}}
			/>
		</StepsRoot>
	);
}
