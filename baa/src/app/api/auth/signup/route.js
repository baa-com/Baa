import { connectDB } from "../../../lib/mongodb";
import { createUser } from "../../models/userModel";
import bcrypt from "bcryptjs";

export async function POST(request) {
	try {
		await connectDB();
		const { firstName, lastName, email, username, password, birthDate } =
			await request.json();
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await createUser(
			firstName,
			lastName,
			email,
			username,
			hashedPassword,
			birthDate
		);
		return new Response(JSON.stringify(user), { status: 200 });
	} catch (error) {
		console.error("Error details:", error);
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
		});
	}
}
