import mongoose from "mongoose";

const SubmissionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    problemId: { type: String, required: true },
    difficulty: { type: String, required: true },
    status: { type: String, required: true },
    language: { type: String, required: true },
    code: { type: String, required: true },
    runtime: String,
    memory: String,
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const Submission =  mongoose.models.Submission || mongoose.model("Submission", SubmissionSchema);

export default Submission;
