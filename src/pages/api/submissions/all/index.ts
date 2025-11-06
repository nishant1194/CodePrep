import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Submission from "@/models/Submission.model";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const url = new URL(req.url);
    const problemId = url.searchParams.get("problemId");
    if (!problemId) {
      return NextResponse.json(
        { message: "problemId is required" },
        { status: 400 }
      );
    }


    // Fetch submissions for this problem
    const submissions = await Submission.find({ problemId })
      .sort({ createdAt: -1 }) // newest first

    const total = await Submission.countDocuments({ problemId });

    return NextResponse.json({ submissions, total });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
