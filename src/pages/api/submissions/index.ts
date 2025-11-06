import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Submission from "@/models/Submission.model";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await dbConnect();

    const { userId, problemId, status, language, code, runtime, memory,difficulty } = req.body;
console.log(req.body);
    if (!userId || !problemId || !status || !language || !code) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newSubmission = await Submission.create({
      userId,
      problemId,
      status,
      language,
      code,
      runtime: runtime || "N/A",
      memory: memory || "N/A",
      createdAt: new Date(),
    });

    return res.status(201).json({ message: "Submission created", submission: newSubmission });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
}
