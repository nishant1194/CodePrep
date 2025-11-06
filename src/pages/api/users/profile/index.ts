import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User.model";
import Submission from "@/models/Submission.model";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    if (!userId) {
      return NextResponse.json(
        { message: "userId query parameter is required" },
        { status: 400 }
      );
    }

    // Fetch user basic details
    const user = await User.findById(userId).select("-password");
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    // Fetch submissions
    const submissions = await Submission.find({ userId });

    //  Compute stats
    const solvedProblems = new Set(
      submissions.filter(s => s.status === "Accepted").map(s => s.problemId)
    );

    const difficulties = ["Easy", "Medium", "Hard"] as const;
    const solvedByDifficulty: Record<string, number> = { Easy: 0, Medium: 0, Hard: 0 };
    const totalByDifficulty: Record<string, number> = { Easy: 0, Medium: 0, Hard: 0 };

    submissions.forEach(s => {
      if (difficulties.includes(s.difficulty as any)) {
        totalByDifficulty[s.difficulty]++;
        if (s.status === "Accepted") solvedByDifficulty[s.difficulty]++;
      }
    });

    const submissionHistory = submissions
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      stats: {
        totalSolved: solvedProblems.size,
        solvedByDifficulty,
        totalByDifficulty,
      },
      submissionHistory,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
