"use client";

import { useState } from "react";
import axios from "axios";

export default function FileUploader() {
	const [file, setFile] = useState(null);
	const [uploading, setUploading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!file) {
			alert("Please select a file to upload.");
			return;
		}

		setUploading(true);

		try {
			// Sending the filename and contentType to the backend
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`,
				{ filename: file.name, contentType: file.type }, // No need to use JSON.stringify
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status === 200) {
				const { url, fields } = response.data; // response.json is not required in axios

				const formData = new FormData();
				Object.entries(fields).forEach(([key, value]) => {
					formData.append(key, value);
				});
				formData.append("file", file);

				const uploadResponse = await fetch(url, {
					method: "POST",
					body: formData,
				});

				if (uploadResponse.ok) {
					alert("Upload successful!");
				} else {
					console.error("S3 Upload Error:", uploadResponse);
					alert("Upload failed.");
				}
			} else {
				alert("Failed to get pre-signed URL.");
			}
		} catch (error) {
			console.error("Error during upload:", error);
			alert("An error occurred while uploading.");
		} finally {
			setUploading(false);
		}
	};

	return (
		<main>
			<h1>Upload a File to S3</h1>
			<form onSubmit={handleSubmit}>
				<input
					id="file"
					type="file"
					onChange={(e) => {
						const files = e.target.files;
						if (files) {
							setFile(files[0]);
						}
					}}
					accept="image/png, image/jpeg"
				/>
				<button type="submit" disabled={uploading}>
					Upload
				</button>
			</form>
		</main>
	);
}
