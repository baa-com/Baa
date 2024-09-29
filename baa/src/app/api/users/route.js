import { connectDB } from "../../lib/mongodb";
import { getAllUsers } from "../models/userModel";

export async function GET(request) {
	try {
		await connectDB();
		const users = await getAllUsers();
		return new Response(JSON.stringify(users), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
		});
	}
}
