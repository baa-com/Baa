import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

export async function POST(request) {
	try {
		const { filename, contentType } = await request.json(); // Ensure you're getting the request body correctly

		const client = new S3Client({ region: process.env.AWS_REGION });

		const { url, fields } = await createPresignedPost(client, {
			Bucket: process.env.AWS_BUCKET_NAME,
			Key: `${uuidv4()}-${filename}`, // Make the key unique with the UUID and filename
			Conditions: [
				["content-length-range", 0, 10485760], // Restrict file size to 10MB
				["starts-with", "$Content-Type", contentType], // Ensure the content type matches
			],
			Fields: {
				acl: "public-read",
				"Content-Type": contentType,
			},
			Expires: 600, // The URL expires in 10 minutes
		});

		return new Response(JSON.stringify({ url, fields }), { status: 200 });
	} catch (error) {
		console.error("Error generating presigned URL:", error);
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
		});
	}
}
