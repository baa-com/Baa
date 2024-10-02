import { getAllUsers } from "../../../models/user";

export async function GET(request) {
	try {
		const users = await getAllUsers();
		return new Response(JSON.stringify(users), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
		});
	}
}
