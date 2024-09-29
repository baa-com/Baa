"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import {
	FileUploadDropzone,
	FileUploadList,
	FileUploadRoot,
} from "@/components/ui/file-button";

export default function FileUploader() {
	const [file, setFile] = useState(null);
	const [uploading, setUploading] = useState(false);
	const [previewUrl, setPreviewUrl] = useState("");

	useEffect(() => {
		return () => {
			if (previewUrl) {
				URL.revokeObjectURL(previewUrl);
			}
		};
	}, [previewUrl]);

	const handleFileChange = (e) => {
		const files = e.target.files;
		if (files && files[0]) {
			const selectedFile = files[0];
			setFile(selectedFile);
			const objectUrl = URL.createObjectURL(selectedFile);
			setPreviewUrl(objectUrl);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!file) {
			alert("Please select a file to upload.");
			return;
		}

		setUploading(true);

		try {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`,
				{ filename: file.name, contentType: file.type },
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status === 200) {
				const { url, fields } = response.data;

				const formData = new FormData();
				Object.entries(fields).forEach(([key, value]) => {
					formData.append(key, value);
				});
				formData.append("file", file);

				const uploadResponse = await axios.post(url, formData);

				if (uploadResponse.status >= 200 && uploadResponse.status < 300) {
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
					onChange={handleFileChange}
					accept="image/png, image/jpeg"
				/>
				<button type="submit" disabled={uploading}>
					Upload
				</button>
			</form>
			{previewUrl && (
				<div>
					<h2>Image Preview:</h2>
					<img
						src={previewUrl}
						alt="File Preview"
						style={{ maxWidth: "100%", height: "auto" }}
					/>
				</div>
			)}
		</main>
	);
}
