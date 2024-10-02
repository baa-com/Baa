// "use client";

// import { useState, useRef } from "react";
// import { chakra, useRecipe } from "@chakra-ui/react";
// import AutoResize from "react-textarea-autosize";
// import {
// 	DialogBody,
// 	DialogContent,
// 	DialogFooter,
// 	DialogHeader,
// 	DialogRoot,
// 	DialogTitle,
// 	DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input, Stack, Button, Textarea, Image } from "@chakra-ui/react";
// import { Field } from "@/components/ui/field";
// import FileUploader from "../FileUploader/FileUploader";

// const StyledAutoResize = chakra(AutoResize);

// const AddPostModal = () => {
// 	const ref = useRef(null);
// 	const [caption, setCaption] = useState("");
// 	const [firstImageUrl, setFirstImageUrl] = useState("");
// 	const [secondImageUrl, setSecondImageUrl] = useState("");

// 	const recipe = useRecipe({ key: "textarea" });
// 	const styles = recipe({ size: "sm" });

// 	const handleCaptionChange = (e) => {
// 		setCaption(e.target.value);
// 	};

// 	const handleFirstImageUpload = (url) => {
// 		setFirstImageUrl(url);
// 	};

// 	const handleSecondImageUpload = (url) => {
// 		setSecondImageUrl(url);
// 	};

// 	const handleSubmit = () => {
// 		// Handle post submission logic here
// 		const postData = {
// 			caption,
// 			firstImage: firstImageUrl,
// 			secondImage: secondImageUrl,
// 		};
// 		console.log(postData);
// 	};

// 	return (
// 		<DialogRoot initialFocusEl={() => ref.current}>
// 			<DialogTrigger asChild>
// 				<Button variant="outline">Create Post</Button>
// 			</DialogTrigger>
// 			<DialogContent>
// 				<DialogHeader>
// 					<DialogTitle>Create Post</DialogTitle>
// 				</DialogHeader>
// 				<DialogBody pb="4">
// 					<Stack gap="4">
// 						<StyledAutoResize
// 							placeholder="This textarea will autoresize as you type"
// 							minH="initial"
// 							resize="none"
// 							overflow="hidden"
// 							lineHeight="inherit"
// 							css={styles}
// 						/>

// 						<Field label="First Image">
// 							<FileUploader onUploadSuccess={handleFirstImageUpload} />
// 						</Field>
// 						{firstImageUrl && (
// 							<Image
// 								src={firstImageUrl}
// 								alt="First Image Preview"
// 								maxW="100%"
// 								mt="4"
// 							/>
// 						)}

// 						<Field label="Second Image">
// 							<FileUploader onUploadSuccess={handleSecondImageUpload} />
// 						</Field>
// 						{secondImageUrl && (
// 							<Image
// 								src={secondImageUrl}
// 								alt="Second Image Preview"
// 								maxW="100%"
// 								mt="4"
// 							/>
// 						)}
// 					</Stack>
// 				</DialogBody>
// 				<DialogFooter>
// 					<Button variant="outline">Cancel</Button>
// 					<Button onClick={handleSubmit}>Post</Button>
// 				</DialogFooter>
// 			</DialogContent>
// 		</DialogRoot>
// 	);
// };

// export default AddPostModal;

"use client";

import { useState, useRef } from "react";
import axios from "axios";
import {
	FileUploadRoot,
	FileUploadDropzone,
	FileUploadList,
	FileUploadClearTrigger,
} from "@/components/ui/file-button"; // Your custom file upload components
import { Button } from "@/components/ui/button";
import {
	DialogBody,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogRoot,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import { chakra, useRecipe } from "@chakra-ui/react";
import AutoResize from "react-textarea-autosize";

const StyledAutoResize = chakra(AutoResize);

const AddPostModal = ({ dialogueTrigger }) => {
	const ref = useRef(null);
	const recipe = useRecipe({ key: "textarea" });
	const styles = recipe({ size: "sm" });

	const [caption, setCaption] = useState("");
	const [files, setFiles] = useState([]); // State to store selected files
	const [uploading, setUploading] = useState(false);

	const handleCaptionChange = (e) => {
		setCaption(e.target.value);
	};

	// Update this function to log the file data and ensure it's an array
	const handleFileChange = (fileData) => {
		console.log("Files uploaded:", fileData); // Log to inspect the structure
		if (fileData && Array.isArray(fileData.acceptedFiles)) {
			setFiles(fileData.acceptedFiles); // Ensure files is an array
		} else {
			console.error("Expected an array of files, but got:", fileData);
			setFiles([]); // Clear files if it's not an array
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Check if files are selected
		if (files.length === 0) {
			alert("Please select at least one file to upload.");
			return;
		}

		setUploading(true);

		try {
			// Loop over each file to upload
			const uploadedFiles = await Promise.all(
				files.map(async (file) => {
					// Get the S3 presigned URL for each file
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

						// Upload the file to S3
						const uploadResponse = await axios.post(url, formData);

						if (uploadResponse.status >= 200 && uploadResponse.status < 300) {
							return `${url}${fields.key}`; // Return the uploaded file URL
						} else {
							throw new Error("Upload failed.");
						}
					} else {
						throw new Error("Failed to get presigned URL.");
					}
				})
			);

			// Send the uploaded file URLs and caption to the backend
			const postResponse = await axios.post(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`,
				{
					caption,
					firstImage: uploadedFiles[0] || "",
					secondImage: uploadedFiles[1] || "",
				}
			);

			if (postResponse.status === 200) {
				alert("Post created successfully!");
			} else {
				alert("Failed to create post.");
			}
		} catch (error) {
			console.error("Error during submission:", error);
			alert("An error occurred during submission.");
		} finally {
			setUploading(false);
		}
	};

	return (
		<DialogRoot initialFocusEl={() => ref.current}>
			<DialogTrigger asChild>
				<Button variant="outline">Create</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create Post</DialogTitle>
				</DialogHeader>
				<DialogBody pb="4">
					<Field label="Caption" asterisk helperText="Max 500 characters.">
						<StyledAutoResize
							value={caption}
							onChange={handleCaptionChange}
							placeholder="Caption"
							minH="initial"
							resize="none"
							overflow="hidden"
							lineHeight="inherit"
							css={styles}
						/>
					</Field>
					<FileUploadRoot
						accept={["image/png", "image/jpg", "image/jpeg"]}
						maxW="xl"
						alignItems="stretch"
						maxFiles={2}
						onFileChange={handleFileChange} // Capture file changes here
					>
						<FileUploadDropzone
							label="Drag and drop here to upload"
							description=".png, .jpg up to 5MB"
						/>
						<FileUploadList showDelete />
						<Button onClick={handleSubmit} isLoading={uploading}>
							Save
						</Button>
						<FileUploadClearTrigger asChild>
							<Button variant="outline">Clear Files</Button>
						</FileUploadClearTrigger>
					</FileUploadRoot>
				</DialogBody>
				<DialogFooter>
					<Button variant="outline">Cancel</Button>
				</DialogFooter>
			</DialogContent>
		</DialogRoot>
	);
};

export default AddPostModal;
