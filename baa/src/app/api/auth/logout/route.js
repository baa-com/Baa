import { deleteSession } from "../../../../lib/session";
import { redirect } from "next/navigation";

export async function DELETE(request) {
	try {
		deleteSession();
		return new Response(JSON.stringify({ success: true }), {
			status: 200,
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
		});
	}
}
