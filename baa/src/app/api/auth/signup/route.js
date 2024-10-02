import { createUser } from "../../../../models/user";
import { createSession } from "../../../../lib/session";
import bcrypt from "bcryptjs";

export async function POST(request) {
	try {
		const { fullName, email, phoneNumber, username, password, birthday } =
			await request.json();
		const hashedPassword = await bcrypt.hash(password, 10);
		const birthDate = new Date(birthday);
		const user = await createUser(
			fullName,
			email,
			phoneNumber,
			username,
			hashedPassword,
			birthDate
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
