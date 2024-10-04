import { createUser } from "../../../../models/user";
import { createSession } from "../../../../lib/session";
import bcrypt from "bcryptjs";

export async function POST(request) {
	try {
		const { name, email, phone, username, password, birthday, method } =
			await request.json();
		const hashedPassword = await bcrypt.hash(password, 10);
		const birthDate = new Date(birthday);
		const user = await createUser(
			name,
			email,
			phone,
			username,
			hashedPassword,
			birthDate,
			method?.toLowerCase()
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
