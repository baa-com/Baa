"use client";

import {
	Container,
	HStack,
	Button,
	Input,
	Stack,
	Center,
	Image,
	Heading,
	Text,
	Link,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import NextImage from "next/image";
import axios from "axios";
import HiddenIcon from "../../components/icons/hidden";
import VisibleIcon from "../../components/icons/visible";
import NextLink from "next/link";
import toast, { Toaster, LoaderIcon } from "react-hot-toast";
import SuccessIcon from "../../components/icons/success";
import ErrorIcon from "../../components/icons/error";

export default function Verify() {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = handleSubmit(async (data) => {
		toast.promise(
			axios
				.post(
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
				)
				.catch((error) => {
					console.error("Error during login:", error);
					return error.message;
				})
				.then((response) => {
					localStorage.setItem("token", response.data.token);
					router.push("/home");
				}),
			{
				loading: "Logging in... Please wait.",
				success: "Login successful! Welcome back!",
				error: "Login failed. Please check your credentials and try again.",
			}
		);
	});

	return (
		<Container>
			<HStack width="dvw" height="dvh" gap="0">
				<Center w="60%" h="100%">
					<form onSubmit={onSubmit}>
						<Stack gap="4" maxW="md">
							<Heading alignSelf="center" fontWeight="bold" size="5xl">
								Log In
							</Heading>
							<Text alignSelf="center" fontSize="xl">
								Welcome back! Please enter your credentials.
							</Text>
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
								Log In
							</Button>
							<Text alignSelf="center" fontSize="xl">
								Don&apos;t have an account?{" "}
								<Link asChild fontWeight="semibold">
									<NextLink href="/signup">Sign up</NextLink>
								</Link>
							</Text>
						</Stack>
					</form>
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
		</Container>
	);
}
