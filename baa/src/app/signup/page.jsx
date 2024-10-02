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
	Highlight,
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

function BirthdayStep({ setStep, setBirthday }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const calculateAge = (birthday) => {
		const today = new Date();
		const birth = new Date(birthday);
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

	const onSubmit = handleSubmit((data) => {
		const { birthday } = data;
		setBirthday(birthday);
		setStep(1);
	});

	return (
		<form onSubmit={onSubmit}>
			<Stack gap="4">
				<Heading alignSelf="center" fontWeight="bold" size="5xl" mb="4">
					Create your account
				</Heading>
				<Field
					w="full"
					fontSize="xl"
					label="Birthday"
					invalid={!!errors.birthday}
					errorText={errors.birthday?.message}
				>
					<Input
						p="25px"
						borderRadius="10px"
						borderColor="black"
						fontSize="xl"
						_dark={{ borderColor: "white" }}
						css={{
							"&::-webkit-calendar-picker-indicator": {
								display: "none",
							},
						}}
						type="date"
						autoComplete="off"
						{...register("birthday", {
							required: "Birthday is required",
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
					fontSize="xl"
					borderRadius="10px"
					bg="#4080FF"
					color="white"
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

function EmailStep({ setStep, setEmail }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = handleSubmit((data) => {
		const { email } = data;
		setEmail(email);
		toast.promise(
			axios
				.post(
					`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verification/send`,
					{
						recipient: email,
					},
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				)
				.catch((error) => {
					console.error("Error sending code:", error);
					const errorMessage = error?.response?.data?.error;
					throw new Error(errorMessage);
				})
				.then((response) => {
					setStep(2);
				}),
			{
				loading: "Sending code... Please wait.",
				success: "Code sent successfully!",
				error: "Code send failed. Please try again in a few minutes.",
			}
		);
	});

	return (
		<form onSubmit={onSubmit}>
			<Stack gap="4">
				<Heading alignSelf="center" fontWeight="bold" size="5xl" mb="4">
					Create your account
				</Heading>
				<Field
					w="full"
					fontSize="xl"
					label="Email"
					invalid={!!errors.email}
					errorText={errors.email?.message}
				>
					<Input
						p="25px"
						fontSize="xl"
						borderRadius="10px"
						borderColor="black"
						_dark={{ borderColor: "white" }}
						placeholder="Email"
						_placeholder={{ color: "#BBBBBB" }}
						autoComplete="off"
						{...register("email", {
							required: "Email is required",
							pattern: {
								value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
								message: "Please enter a valid email",
							},
						})}
					/>
				</Field>
				<Button
					type="submit"
					w="full"
					p="25px"
					fontSize="xl"
					borderRadius="10px"
					bg="#4080FF"
					color="white"
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

function VerificationStep({ email, setStep }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const resendCode = () => {
		toast.promise(
			axios
				.post(
					`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verification/send`,
					{
						recipient: email,
					},
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				)
				.catch((error) => {
					console.error("Error resending code:", error);
					const errorMessage = error?.response?.data?.error;
					throw new Error(errorMessage);
				})
				.then((response) => {}),
			{
				loading: "Resending code... Please wait.",
				success: "Code resent successfully!",
				error: "Code resend failed. Please try again in a few minutes.",
			}
		);
	};

	const onSubmit = handleSubmit((data) => {
		const { code } = data;

		toast.promise(
			axios
				.post(
					`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verification/check`,
					{
						code: code,
						recipient: email,
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

					if (errorMessage?.includes("Invalid code")) {
						throw new Error(
							"Verification failed. Please check the code and try again."
						);
					} else {
						throw new Error(
							"Verification failed. Please try again in a few minutes."
						);
					}
				})
				.then((response) => {
					setStep(3);
				}),
			{
				loading: "Verifying your email... Please wait.",
				success: "Verification successful!",
				error: (e) => e.message,
			}
		);
	});

	return (
		<form onSubmit={onSubmit}>
			<Heading fontWeight="bold" size="5xl">
				Verify your email
			</Heading>
			<Stack gap="4" maxWidth="min-content">
				<Text fontSize="xl" alignSelf="center" textAlign="center" mb="4">
					You're almost there! We sent a code to{" "}
					<Text as="span" fontWeight="bold">
						{email}
					</Text>
					. Enter it below.
				</Text>
				<Field
					w="full"
					fontSize="xl"
					invalid={!!errors.code}
					errorText={errors.code?.message}
				>
					<PinInput
						alignSelf="center"
						placeholder=""
						borderRadius="10px"
						borderColor="black"
						fontSize="xl"
						_dark={{ borderColor: "white" }}
						{...register("code", {
							required: "Verification code is required",
							minLength: {
								value: 6,
								message: "6-digit verification code is required",
							},
						})}
					/>
				</Field>
				<Button
					type="submit"
					w="full"
					p="25px"
					fontSize="xl"
					borderRadius="10px"
					bg="#4080FF"
					color="white"
				>
					Verify
				</Button>
				<HStack justify="space-around">
					<Text
						alignSelf="center"
						fontSize="xl"
						fontWeight="semibold"
						cursor="pointer"
						onClick={() => {
							setStep(1);
						}}
					>
						Change email
					</Text>
					<Text
						alignSelf="center"
						fontSize="xl"
						fontWeight="semibold"
						cursor="pointer"
						onClick={resendCode}
					>
						Resend code
					</Text>
				</HStack>
			</Stack>
		</form>
	);
}

function RegistrationStep({ birthday, email, phoneNumber }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const router = useRouter();

	const onSubmit = handleSubmit((data) => {
		const { fullName, username, password } = data;
		toast.promise(
			axios
				.post(
					`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signup`,
					{
						fullName,
						email,
						phoneNumber,
						username,
						password,
						birthday,
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
						throw new Error(
							"Login failed. Username taken. Please try another."
						);
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
		<form onSubmit={onSubmit}>
			<Stack gap="4">
				<Heading alignSelf="center" fontWeight="bold" size="5xl" mb="4">
					Create your account
				</Heading>
				<Field
					w="full"
					fontSize="xl"
					label="Full Name"
					invalid={!!errors.fullName}
					errorText={errors.fullName?.message}
				>
					<Input
						p="25px"
						fontSize="xl"
						borderRadius="10px"
						borderColor="black"
						_dark={{ borderColor: "white" }}
						placeholder="Enter your full name"
						_placeholder={{ color: "#BBBBBB" }}
						autoComplete="off"
						{...register("fullName", {
							required: "Full name is required",
						})}
					/>
				</Field>
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
						borderRadius="10px"
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
						borderRadius="10px"
						borderColor="black"
						_dark={{ borderColor: "white" }}
						placeholder="Enter your password"
						_placeholder={{ color: "#BBBBBB" }}
						visibilityIcon={{
							off: <VisibleIcon boxSize="24px" color="black" />,
							on: <HiddenIcon boxSize="24px" color="black" />,
						}}
						{...register("password", {
							required: "Password is required",
						})}
					/>
				</Field>
				<Button
					type="submit"
					w="full"
					p="25px"
					fontSize="xl"
					borderRadius="10px"
					bg="#4080FF"
					color="white"
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
	);
}

export default function SignUp() {
	const [step, setStep] = useState(0);
	const [birthday, setBirthday] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");

	return (
		<StepsRoot step={step} count={4}>
			<HStack width="dvw" height="dvh" gap="0">
				<Center w="60%" h="100%">
					<Stack gap="8" maxW="md">
						<StepsContent index={0}>
							<BirthdayStep setStep={setStep} setBirthday={setBirthday} />
						</StepsContent>
						<StepsContent index={1}>
							<EmailStep setStep={setStep} setEmail={setEmail} />
						</StepsContent>
						<StepsContent index={2}>
							<VerificationStep email={email} setStep={setStep} />
						</StepsContent>
						<StepsContent index={3}>
							<RegistrationStep
								birthday={birthday}
								email={email}
								phoneNumber={phoneNumber}
							/>
						</StepsContent>
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
