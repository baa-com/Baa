import { createUser } from "../../../../models/user";
import { createSession } from "../../../../lib/session";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function POST(request) {
	try {
		const {
			firstName,
			lastName,
			email,
			phoneNumber,
			username,
			password,
			birthDate,
		} = await request.json();
		const hashedPassword = await bcrypt.hash(password, 10);
		const dateOfBirth = new Date(birthDate);
		const user = await createUser(
			firstName,
			lastName,
			email,
			phoneNumber,
			username,
			hashedPassword,
			dateOfBirth
		);
		await createSession(user._id);
		return new Response(JSON.stringify({ success: true }), {
			status: 200,
		});
	} catch (error) {
		console.error("Error details:", error);
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
		});
	}
}
