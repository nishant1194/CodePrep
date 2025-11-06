import { NextRequest, NextResponse } from "next/server";
import  dbConnect from "@/lib/dbConnect";
import Submission from "@/models/Submission.model";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    const problemId = url.searchParams.get("problemId");

    if (!userId || !problemId) {
      return NextResponse.json(
        { message: "userId and problemId are required" },
        { status: 400 }
      );
    }

    const submissions = await Submission.find({
      userId,
      problemId,
    }).sort({ createdAt: -1 }); // newest first

    return NextResponse.json({ submissions });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
