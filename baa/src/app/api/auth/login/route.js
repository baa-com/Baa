import { getUserByUsername } from "../../../../models/user";
import { createSession } from "../../../../lib/session";
import bcrypt from "bcryptjs";

export async function POST(request) {
	try {
		const { username, password } = await request.json();
		const user = await getUserByUsername(username);
		if (user && (await bcrypt.compare(password, user.password))) {
			await createSession(user._id);
			return new Response(JSON.stringify({ success: true }), {
				status: 200,
			});
		} else {
			return new Response(JSON.stringify({ error: "Invalid credentials" }), {
				status: 400,
			});
		}
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
		});
	}
}
