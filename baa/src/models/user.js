import { connectDB } from "../lib/mongodb";
import User from "../schemas/user";

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
	phoneNumber,
	username,
	password,
	birthDate
) {
	await connectDB();
	return await User.create({
		firstName,
		lastName,
		email,
		phoneNumber,
		username,
		password,
		birthDate,
	});
}
