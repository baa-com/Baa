"use client";

import {
	HStack,
	Button,
	Box,
	Input,
	Stack,
	Heading,
	Center,
	Image,
	Text,
	Link,
	List,
	Separator,
	Collapsible,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { StepsContent, StepsRoot } from "@/components/ui/steps";
import {
	MenuContent,
	MenuItem,
	MenuRoot,
	MenuTrigger,
} from "@/components/ui/menu";
import { PinInput } from "@/components/ui/pin-input";
import { PasswordInput } from "@/components/ui/password-input";
import { useForm } from "react-hook-form";
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
import {
	CaretDown,
	CaretUp,
	CheckCircle,
	XCircle,
} from "@phosphor-icons/react";
import { LuCircleDashed } from "react-icons/lu";
import GoogleLogo from "@/components/icons/google-logo";
import AppleLogo from "@/components/icons/apple-logo";

function JoinStep({ setStep }) {
	return (
		<Stack gap="4">
			<Heading alignSelf="center" fontWeight="bold" size="5xl" mb="4">
				Join Baa
			</Heading>
			<Button
				w="full"
				p="25px"
				fontSize="xl"
				borderWidth="2px"
				borderRadius="10px"
				bg="white"
				color="black"
				fontWeight="semibold"
				cursor="pointer"
				onClick={() => {}}
			>
				<GoogleLogo /> Sign up with Google
			</Button>
			<Button
				w="full"
				p="25px"
				fontSize="xl"
				borderWidth="2px"
				borderRadius="10px"
				bg="white"
				color="black"
				fontWeight="semibold"
				cursor="pointer"
				onClick={() => {}}
			>
				<AppleLogo /> Sign up with Apple
			</Button>
			<HStack>
				<Separator />
				<Text flexShrink="0" fontSize="xl">
					or
				</Text>
				<Separator />
			</HStack>
			<Button
				w="full"
				p="25px"
				fontSize="xl"
				borderRadius="10px"
				bg="#4080FF"
				color="white"
				fontWeight="semibold"
				cursor="pointer"
				onClick={() => {
					setStep(1);
				}}
			>
				Create account
			</Button>
			<Text alignSelf="center" fontSize="xl">
				Already have an account?{" "}
				<Link
					asChild
					fontWeight="medium"
					color="#4080FF"
					_hover={{ textDecor: "underline" }}
				>
					<NextLink href="/login">Log in</NextLink>
				</Link>
			</Text>
		</Stack>
	);
}

function InfoStep({
	method,
	setStep,
	setName,
	setMethod,
	setEmail,
	setPhone,
	setBirthday,
}) {
	const {
		resetField,
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		mode: "onChange",
	});

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
		const { name, contact, birthday } = data;
		setName(name);
		setBirthday(birthday);
		let recipient = contact;
		if (contact.includes("@")) {
			setEmail(contact);
		} else if (contact.replace(" ", "").length === 10) {
			recipient = `+1${contact}`;
			setPhone(recipient);
		} else {
			setPhone(contact);
		}

		toast.promise(
			axios
				.post(
					`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verification/send`,
					{
						channel: method === "Email" ? "email" : "sms",
						recipient,
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
					resetField("contact");
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
					Tell us about yourself
				</Heading>
				<Field
					w="full"
					fontSize="xl"
					invalid={!!errors.name}
					errorText={errors.name?.message}
				>
					<Input
						p="25px"
						fontSize="xl"
						borderWidth="2px"
						borderRadius="10px"
						placeholder="Name"
						_placeholder={{ color: "black" }}
						_dark={{ _placeholder: { color: "white" } }}
						autoComplete="off"
						{...register("name", {
							required: "What's your name?",
						})}
					/>
				</Field>
				<Field
					w="full"
					fontSize="xl"
					invalid={!!errors.contact}
					errorText={errors.contact?.message}
				>
					<Input
						p="25px"
						fontSize="xl"
						borderWidth="2px"
						borderRadius="10px"
						placeholder={method}
						_placeholder={{ color: "black" }}
						_dark={{ _placeholder: { color: "white" } }}
						autoComplete="off"
						{...register("contact", {
							required: true,
							pattern: {
								value:
									method === "Email"
										? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
										: /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
								message: `Please enter a valid ${method.toLowerCase()}`,
							},
						})}
					/>
				</Field>
				<Text
					maxW="fit-content"
					alignSelf="end"
					fontSize="lg"
					fontWeight="medium"
					color="#4080FF"
					cursor="pointer"
					_hover={{ textDecor: "underline" }}
					onClick={() => {
						setMethod(method === "Email" ? "Phone" : "Email");
						resetField("contact");
					}}
				>
					Use {method === "Email" ? "phone" : "email"} instead
				</Text>
				<Field
					w="full"
					fontSize="xl"
					label="Birthday"
					helperText="This will not be shown publicly"
					invalid={!!errors.birthday}
					errorText={errors.birthday?.message}
				>
					<Input
						p="25px"
						borderWidth="2px"
						borderRadius="10px"
						fontSize="xl"
						css={{
							"&::-webkit-calendar-picker-indicator": {
								display: "none",
							},
						}}
						type="date"
						autoComplete="off"
						{...register("birthday", {
							required: "What's your birthday?",
							validate: (value) =>
								calculateAge(value) >= 14 ||
								"You must be at least 14 years old to register",
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
					fontWeight="semibold"
					cursor="pointer"
					disabled={!isValid}
					_disabled={{ cursor: "not-allowed" }}
				>
					Continue
				</Button>
			</Stack>
		</form>
	);
}

function VerificationStep({
	contact,
	method,
	setStep,
	setMethod,
	setEmail,
	setPhone,
}) {
	const {
		register,
		handleSubmit,
		formState: { isValid },
	} = useForm();

	const resendCode = () => {
		toast.promise(
			axios
				.post(
					`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verification/send`,
					{
						channel: method === "Email" ? "email" : "sms",
						recipient: contact,
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
						recipient: contact,
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
				loading: `Verifying ${
					contact?.includes("@") ? "email" : "phone"
				}... Please wait.`,
				success: "Verification successful!",
				error: (e) => e.message,
			}
		);
	});

	return (
		<form onSubmit={onSubmit}>
			<Stack gap="4">
				<Heading alignSelf="center" fontWeight="bold" size="5xl" mb="4">
					We sent you a code
				</Heading>
				<Text maxW="fit-content" fontSize="lg" fontWeight="medium">
					Enter it below to verify {contact}
				</Text>
				<Field w="full" fontSize="xl">
					<PinInput
						otp
						alignSelf="center"
						placeholder=""
						borderRadius="10px"
						fontSize="xl"
						{...register("code", {
							required: true,
							minLength: {
								value: 6,
							},
						})}
					/>
				</Field>
				<MenuRoot variant="subtle">
					<MenuTrigger maxW="fit-content" alignSelf="end">
						<Text
							fontSize="lg"
							fontWeight="medium"
							color="#4080FF"
							cursor="pointer"
							_hover={{ textDecor: "underline" }}
						>
							Didn't receive code?
						</Text>
					</MenuTrigger>
					<MenuContent p="2" w="155px">
						<MenuItem value="resend-code" p="2" onClick={resendCode}>
							Resend code
						</MenuItem>
						<MenuItem
							value="change"
							p="2"
							onClick={() => {
								setStep(0);
							}}
						>
							Change {contact?.includes("@") ? "email" : "phone"}
						</MenuItem>
						<MenuItem
							value="use-other"
							p="2"
							onClick={() => {
								setMethod(method === "Email" ? "Phone" : "Email");
								setStep(0);
								setEmail("");
								setPhone("");
							}}
						>
							Use {contact?.includes("@") ? "phone" : "email"} instead
						</MenuItem>
					</MenuContent>
				</MenuRoot>
				<Button
					type="submit"
					w="full"
					p="25px"
					fontSize="xl"
					borderRadius="10px"
					bg="#4080FF"
					color="white"
					fontWeight="semibold"
					cursor="pointer"
					disabled={!isValid}
					_disabled={{ cursor: "not-allowed" }}
				>
					Continue
				</Button>
			</Stack>
		</form>
	);
}

function RegistrationStep({ name, method, email, phone, birthday }) {
	const [open, setOpen] = useState(false);
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isValid },
	} = useForm({
		mode: "onChange",
	});
	const value = watch("password", "");
	const router = useRouter();

	const checkUsername = (username) => {
		return /^[a-zA-Z0-9_]+$/.test(username);
	};

	const checkPassword = (password) => {
		return (
			!/^[^0-9]*$/.test(password) &&
			!/^[^a-z]*$/.test(password) &&
			!/^[^A-Z]*$/.test(password) &&
			!/^[a-zA-Z0-9]*$/.test(password)
		);
	};

	const onSubmit = handleSubmit((data) => {
		const { username, password } = data;
		toast.promise(
			axios
				.post(
					`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signup`,
					{
						name,
						email,
						phone,
						username,
						password,
						birthday,
						method,
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
					invalid={!!errors.username}
					errorText={errors.username?.message}
				>
					<Input
						p="25px"
						fontSize="xl"
						borderWidth="2px"
						borderRadius="10px"
						placeholder="Username"
						_placeholder={{ color: "black" }}
						_dark={{ _placeholder: { color: "white" } }}
						autoComplete="off"
						{...register("username", {
							required: "Please choose a username",
							maxLength: {
								value: 14,
								message: "Your username must be shorter than 15 characters",
							},
							validate: (x) =>
								checkUsername(x) ||
								"Your username can only contain letters, numbers and '_'",
						})}
					/>
				</Field>
				<Field
					w="full"
					fontSize="xl"
					invalid={!!errors.password}
					errorText={errors.password?.message}
				>
					<PasswordInput
						p="25px"
						fontSize="xl"
						borderWidth="2px"
						borderRadius="10px"
						placeholder="Password"
						_placeholder={{ color: "black" }}
						_dark={{ _placeholder: { color: "white" } }}
						visibilityIcon={{
							off: <VisibleIcon boxSize="24px" />,
							on: <HiddenIcon boxSize="24px" />,
						}}
						{...register("password", {
							required: "Make sure your password meets all requirements",
							minLength: {
								value: 8,
								message: "Make sure your password meets all requirements",
							},
							validate: (x) =>
								checkPassword(x) ||
								"Make sure your password meets all requirements",
						})}
					/>
				</Field>
				<Collapsible.Root
					onOpenChange={() => {
						setOpen(true);
					}}
					onExitComplete={() => {
						setOpen(false);
					}}
				>
					<Collapsible.Trigger>
						<HStack align="start">
							<Text maxW="fit-content" fontSize="md" fontWeight="medium" mb="4">
								Password requirements
							</Text>
							{open ? <CaretUp size={24} /> : <CaretDown size={24} />}
						</HStack>
					</Collapsible.Trigger>
					<Collapsible.Content>
						<List.Root gap="2" variant="plain" align="center">
							<List.Item>
								<HStack>
									<List.Indicator>
										{/^.{0,7}$/.test(value) ? (
											<XCircle color="#F87171" weight="regular" size={24} />
										) : (
											<CheckCircle color="#73F871" weight="regular" size={24} />
										)}
									</List.Indicator>
									<Text>At least 8 characters</Text>
								</HStack>
							</List.Item>
							<List.Item>
								<HStack>
									<List.Indicator>
										{/^[^0-9]*$/.test(value) ? (
											<XCircle color="#F87171" weight="regular" size={24} />
										) : (
											<CheckCircle color="#73F871" weight="regular" size={24} />
										)}
									</List.Indicator>
									<Text>Contains a number</Text>
								</HStack>
							</List.Item>
							<List.Item>
								<HStack>
									<List.Indicator>
										{/^[^a-z]*$/.test(value) ? (
											<XCircle color="#F87171" weight="regular" size={24} />
										) : (
											<CheckCircle color="#73F871" weight="regular" size={24} />
										)}
									</List.Indicator>
									<Text>Contains a lowercase letter</Text>
								</HStack>
							</List.Item>
							<List.Item>
								<HStack>
									<List.Indicator>
										{/^[^A-Z]*$/.test(value) ? (
											<XCircle color="#F87171" weight="regular" size={24} />
										) : (
											<CheckCircle color="#73F871" weight="regular" size={24} />
										)}
									</List.Indicator>
									<Text>Contains an uppercase letter</Text>
								</HStack>
							</List.Item>
							<List.Item>
								<HStack>
									<List.Indicator>
										{/^[a-zA-Z0-9]*$/.test(value) ? (
											<XCircle color="#F87171" weight="regular" size={24} />
										) : (
											<CheckCircle color="#73F871" weight="regular" size={24} />
										)}
									</List.Indicator>
									<Text>Contains a special character</Text>
								</HStack>
							</List.Item>
						</List.Root>
					</Collapsible.Content>
				</Collapsible.Root>
				<Button
					type="submit"
					w="full"
					p="25px"
					fontSize="xl"
					borderRadius="10px"
					bg="#4080FF"
					color="white"
					fontWeight="semibold"
					cursor="pointer"
					disabled={!isValid}
					_disabled={{ cursor: "not-allowed" }}
				>
					Sign Up
				</Button>
			</Stack>
		</form>
	);
}

export default function SignUp() {
	const [step, setStep] = useState(0);
	const [name, setName] = useState("");
	const [method, setMethod] = useState("Email");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [birthday, setBirthday] = useState("");

	return (
		<StepsRoot step={step} count={4}>
			<HStack width="dvw" height="dvh" gap="0">
				<Center w="60%" h="100%">
					<Stack gap="8" maxW="md">
						<StepsContent index={0}>
							<JoinStep setStep={setStep} />
						</StepsContent>
						<StepsContent index={1}>
							<InfoStep
								method={method}
								setStep={setStep}
								setMethod={setMethod}
								setName={setName}
								setEmail={setEmail}
								setPhone={setPhone}
								setBirthday={setBirthday}
							/>
						</StepsContent>
						<StepsContent index={2}>
							<VerificationStep
								contact={email || phone}
								method={method}
								setStep={setStep}
								setMethod={setMethod}
								setEmail={setEmail}
								setPhone={setPhone}
							/>
						</StepsContent>
						<StepsContent index={3}>
							<RegistrationStep
								name={name}
								method={method}
								email={email}
								phone={phone}
								birthday={birthday}
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
