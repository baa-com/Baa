import mongoose, { Schema, model } from "mongoose";

const PostSchema = new Schema(
	{
		caption: {
			type: String,
			required: [true, "Caption is required"],
		},
		firstImage: {
			type: String,
			required: [true, "First image is required"],
		},
		secondImage: {
			type: String,
			required: [true, "Second image is required"],
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		likes: [{ type: Schema.Types.ObjectId, ref: "Person" }],
		comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
		firstVotes: [{ type: Schema.Types.ObjectId, ref: "Person" }],
		secondVotes: [{ type: Schema.Types.ObjectId, ref: "Person" }],
		categories: [{ type: String }],
	},
	{
		timestamps: true,
	}
);

const Post = mongoose.models?.Post || model("Post", PostSchema);
export default Post;
