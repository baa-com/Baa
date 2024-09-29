import { connectDB } from "../../lib/mongodb";
import User from "../schemas/User";

export async function getAllUsers() {
	await connectDB();
	return await User.find({}).exec();
}

export async function getUserByUsername(username) {
	await connectDB();
	return await User.findOne({ username }).exec();
}

export async function createUser(
	firstName,
	lastName,
	email,
	username,
	password,
	birthDate
) {
	await connectDB();
	const dateOfBirth = new Date(birthDate);
	return await User.create({
		firstName,
		lastName,
		email,
		username,
		password,
		birthDate: dateOfBirth,
	});
}
