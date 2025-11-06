import React, { useState } from "react";

type Solution = {
  id: string;
  userName: string;
  language: string;
  runtime: string;
  memory: string;
  code: string;
};

const fakeSolutions: Solution[] = [
  {
    id: "1",
    userName: "Alice",
    language: "Python",
    runtime: "32 ms",
    memory: "14 MB",
    code: `def twoSum(nums, target):
    for i in range(len(nums)):
        for j in range(i+1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]`,
  },
  {
    id: "2",
    userName: "Bob",
    language: "JavaScript",
    runtime: "45 ms",
    memory: "15 MB",
    code: `function twoSum(nums, target) {
    for(let i=0;i<nums.length;i++){
        for(let j=i+1;j<nums.length;j++){
            if(nums[i]+nums[j]===target) return [i,j];
        }
    }
}`,
  },
  {
    id: "3",
    userName: "Charlie",
    language: "C++",
    runtime: "28 ms",
    memory: "13 MB",
    code: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        for(int i=0;i<nums.size();i++)
            for(int j=i+1;j<nums.size();j++)
                if(nums[i]+nums[j]==target)
                    return {i,j};
        return {};
    }
};`,
  },
];

const Solution: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">All Solutions</h2>
      <div className="flex flex-col rounded-lg overflow-hidden">
        {/* Header */}
        <div className="flex bg-[rgb(26,26,26)] text-gray-300 font-medium border-b border-gray-700">
          <div className="flex-1 px-4 py-2   border-gray-700">User</div>
          <div className="flex-1 px-4 py-2   border-gray-700">Language</div>
          <div className="flex-1 px-4 py-2   border-gray-700">Runtime</div>
          <div className="flex-1 px-4 py-2">Memory</div>
        </div>

        {/* Solution Rows */}
        {fakeSolutions.map((sol, idx) => (
          <div key={sol.id} className="border-b border-gray-700">
            <div
              className={`flex cursor-pointer bg-${idx%2 === 0?'[rgb(40,40,40)]':'[rgb(26,26,26)]'} hover:bg-gray-500 transition-colors py-2`}
              onClick={() => toggleExpand(sol.id)}
            >
              <div className="flex-1 px-4 py-2   border-gray-700 text-gray-300">{sol.userName}</div>
              <div className="flex-1 px-4 py-2   border-gray-700 text-gray-300">{sol.language}</div>
              <div className="flex-1 px-4 py-2   border-gray-700 text-gray-300">{sol.runtime}</div>
              <div className="flex-1 px-4 py-2 text-gray-300">{sol.memory}</div>
            </div>

            {/* Code dropdown */}
            {expanded === sol.id && (
              <div className="bg-gray-800 px-4 py-2 text-gray-100 font-mono whitespace-pre-wrap">
                {sol.code}
              </div>
            )}
          </div>
        ))}

        {fakeSolutions.length === 0 && (
          <div className="px-4 py-4 text-center text-gray-400">No solutions yet.</div>
        )}
      </div>
    </div>
  );
};

export default Solution;
