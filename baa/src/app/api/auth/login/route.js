import { connectDB } from "../../../lib/mongodb";
import { getUserByUsername } from "../../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
	try {
		await connectDB();
		const { username, password } = await request.json();
		const user = await getUserByUsername(username);
		if (user && (await bcrypt.compare(password, user.password))) {
			const token = jwt.sign(
				{ userId: user._id, username: user.username },
				process.env.JWT_SECRET
			);
			return new Response(JSON.stringify({ token }), { status: 200 });
		} else {
			return new Response(JSON.stringify({ error: "Invalid Credentials" }), {
				status: 400,
			});
		}
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
		});
	}
}
