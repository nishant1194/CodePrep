import mongoose, { Schema, model, models } from "mongoose";

const ExampleSchema = new Schema({
	id: Number,
	inputText: String,
	outputText: String,
	explanation: String,
});

const TestCaseSchema = new Schema({
	input: String,
	expectedOutput: String,
	stdin: String,
});

const LanguageDataSchema = new Schema({
	starterCode: String,
	handlerFunction: String,
}, { _id: false });

const ProblemSchema = new Schema({
	id: { type: String, required: true, unique: true },
	srNo: { type: Number, required: true },
	title: { type: String, required: true },
	difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
	category: { type: String, required: true },
	videoId: { type: String },
	order: { type: Number, required: true },
	likes: { type: Number, default: 0 },
	dislikes: { type: Number, default: 0 },
	solved: { type: Number, default: 0 },
	constraints: [String],
	problemStatement: { type: String, required: true },
	examples: [ExampleSchema],
	testCases: [TestCaseSchema],
	
	languages: {
		type: Map,
		of: LanguageDataSchema, // e.g., { javascript: { starterCode, handlerFunction }, cpp: {...} }
		default: {},
	},
}, { timestamps: true });

export default models.Problem || model("Problem", ProblemSchema);
