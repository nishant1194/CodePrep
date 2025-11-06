import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Topbar from "@/components/Topbar/Topbar";

type Submission = {
  id: string;
  problem: string;
  status: "Accepted" | "Wrong Answer" | "Runtime Error" | "Time Limit Exceeded";
  language: string;
  runtime: string;
  memory: string;
};

const fakeSubmissions: Submission[] = [
  { id: "1", problem: "Two Sum", status: "Accepted", language: "Python", runtime: "32 ms", memory: "14 MB" },
  { id: "2", problem: "Add Two Numbers", status: "Wrong Answer", language: "JavaScript", runtime: "N/A", memory: "N/A" },
  { id: "3", problem: "Longest Substring", status: "Time Limit Exceeded", language: "C++", runtime: "N/A", memory: "N/A" },
  { id: "4", problem: "Median of Two Arrays", status: "Accepted", language: "Java", runtime: "45 ms", memory: "15 MB" },
  { id: "5", problem: "Valid Parentheses", status: "Accepted", language: "Python", runtime: "28 ms", memory: "13 MB" },
];

const UserProfilePage: React.FC = () => {
  const router = useRouter();
  const { userId } = router.query;

  const [submissions, setSubmissions] = useState<Submission[]>(fakeSubmissions);

  // Fake user data
  const user = {
    name: `User ${userId}`,
    email: `user${userId}@example.com`,
    stats: {
      easy: { solved: 5, total: 10 },
      medium: { solved: 3, total: 10 },
      hard: { solved: 1, total: 5 },
    },
  };

  const totalSolved =
    user.stats.easy.solved + user.stats.medium.solved + user.stats.hard.solved;
  const totalProblems =
    user.stats.easy.total + user.stats.medium.total + user.stats.hard.total;

  return (
      <div className="bg-[rgb(26,26,26)] min-h-screen">
        <Topbar />
    <div className="container mx-auto p-6 flex flex-col md:flex-row gap-6">
      {/* Left panel */}
      <div className="md:w-1/3 bg-[rgb(40,40,40)] rounded-lg p-12 text-gray-200 shadow-lg mr-4 mt-10">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-[#ffa116]">
            <img
              src={`https://i.pravatar.cc/150?u=${userId}`}
              alt="User Avatar"
              className="object-cover w-full h-full"
            />
          </div>
          <h2 className="text-2xl font-bold text-white">{user.name}</h2>
          <p className="text-gray-400">{user.email}</p>
        </div>

        <div className="space-y-5 bg-[rgb(26,26,26)] p-4 rounded-md">
          <div className="flex justify-between">
            <span>Easy Solved</span>
            <span>{user.stats.easy.solved} / {user.stats.easy.total}</span>
          </div>
          <div className="flex justify-between">
            <span>Medium Solved</span>
            <span>{user.stats.medium.solved} / {user.stats.medium.total}</span>
          </div>
          <div className="flex justify-between">
            <span>Hard Solved</span>
            <span>{user.stats.hard.solved} / {user.stats.hard.total}</span>
          </div>
          <div className="flex justify-between font-semibold border-t border-gray-700 pt-2">
            <span>Total Solved</span>
            <span>{totalSolved} / {totalProblems}</span>
          </div>
        </div>
      </div>

      {/* Right panel - Recent submissions */}
      <div className="md:w-2/3 rounded-lg shadow-lg text-white overflow-hidden">
      <div className="text-2xl font-bold text-white my-4">Recent Submissions</div>
<div className="px-8 py-4 bg-[rgb(40,40,40)] rounded-lg">
        <div className="flex bg-[rgb(40,40,40)] text-gray-300 font-medium border-b border-gray-700">
          <div className="flex-1 px-4 py-2 border-gray-700">Problem</div>
          <div className="flex-1 px-4 py-2 border-gray-700">Status</div>
          <div className="flex-1 px-4 py-2 border-gray-700">Language</div>
          <div className="flex-1 px-4 py-2 border-gray-700">Runtime</div>
          <div className="flex-1 px-4 py-2">Memory</div>
        </div>

        {submissions.map((sub, idx) => (
          <div
            key={sub.id}
            className={`flex bg-${idx%2 === 1?'[rgb(40,40,40)]':'[rgb(26,26,26)]'} hover:bg-gray-600 transition-colors border-b border-gray-700 py-2`}
          >
            <div className="flex-1 px-4 py-2  border-gray-700">{sub.problem}</div>
            <div className={`flex-1 px-4 py-2  border-gray-700 font-medium ${sub.status === "Accepted" ? "text-green-400" : "text-red-400"}`}>{sub.status}</div>
            <div className="flex-1 px-4 py-2  border-gray-700">{sub.language}</div>
            <div className="flex-1 px-4 py-2  border-gray-700">{sub.runtime}</div>
            <div className="flex-1 px-4 py-2">{sub.memory}</div>
          </div>
        ))}

        {submissions.length === 0 && (
          <div className="px-4 py-4 text-center text-gray-400">No submissions yet.</div>
        )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserProfilePage;
