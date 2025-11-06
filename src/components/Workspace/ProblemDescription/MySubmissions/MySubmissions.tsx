import React, { useState } from "react";

type Submission = {
  id: string;
  status: "Accepted" | "Wrong Answer" | "Runtime Error" | "Time Limit Exceeded";
  language: string;
  runtime: string;
  memory: string;
};

const fakeSubmissions: Submission[] = [
  { id: "1", status: "Accepted", language: "Python", runtime: "32 ms", memory: "14 MB" },
  { id: "2", status: "Wrong Answer", language: "JavaScript", runtime: "N/A", memory: "N/A" },
  { id: "3", status: "Time Limit Exceeded", language: "C++", runtime: "N/A", memory: "N/A" },
  { id: "4", status: "Runtime Error", language: "Java", runtime: "N/A", memory: "N/A" },
  { id: "5", status: "Accepted", language: "Python", runtime: "28 ms", memory: "13 MB" },
];

const MySubmissions: React.FC = () => {
 
  const [submissions] = useState<Submission[]>(fakeSubmissions);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">My Submissions</h2>

      <div className="flex flex-col rounded-lg overflow-hidden">
        {/* Header */}
        <div className="flex bg-[rgb(26,26,26)] text-gray-300 font-medium border-b border-gray-700">
          <div className="flex-[2] px-4 py-2 border-gray-700">Status</div>
          <div className="flex-1 px-4 py-2  border-gray-700">Language</div>
          <div className="flex-1 px-4 py-2  border-gray-700">Runtime</div>
          <div className="flex-1 px-4 py-2">Memory</div>
        </div>

        {/* Rows */}
        {submissions.map((sub, idx) => (
          <div
            key={sub.id}
            className={`flex bg-${idx%2 === 0?'[rgb(40,40,40)]':'[rgb(26,26,26)]'} hover:bg-gray-500 transition-colors border-b border-gray-700 py-2`}
          >
            <div
              className={`flex-[2] px-4 py-2 font-medium   border-gray-700 ${
                sub.status === "Accepted" ? "text-green-400" : "text-red-400"
              }`}
            >
              {sub.status}
            </div>
            <div className="flex-1 px-4 py-2   border-gray-700 text-gray-300">{sub.language}</div>
            <div className="flex-1 px-4 py-2  border-gray-700 text-gray-300">{sub.runtime}</div>
            <div className="flex-1 px-4 py-2 text-gray-300">{sub.memory}</div>
          </div>
        ))}

        {submissions.length === 0 && (
          <div className="px-4 py-4 text-center text-gray-400">No submissions yet.</div>
        )}
      </div>
    </div>
  );
};

export default MySubmissions;
