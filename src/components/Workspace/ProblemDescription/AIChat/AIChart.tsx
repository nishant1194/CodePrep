import React, { useState } from "react";
import { GoogleGenAI } from "@google/genai";

type ChatEntry = {
  query: string;
  response: string;
};

type AIChatProps = {
  problem: { desc: string };
  userCode: string;
};

const AIChat: React.FC<AIChatProps> = ({ problem, userCode }) => {
  const [chatHistory, setChatHistory] = useState<ChatEntry[]>([]);
  const [currentQuery, setCurrentQuery] = useState("");

  const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY});
  // Fake AI response generator for now
  const getAIResponse = async (query: string) => {
    // Replace this with your GoogleGenerativeAI API call
    try {
        const q  = problem.problemStatement + userCode + query +"Give answer in 100words only. Not gretaer than that.";
         const reps = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: q,
    });
    console.log(reps)
    return reps.text;
        
    } catch (error) {
        console.log(error);
        return "error is there."
    }
};

  const handleSend = async () => {
    if (!currentQuery.trim()) return;

    const userQuery = currentQuery;
    setCurrentQuery(""); // Clear input

    // Get AI response
    const aiResponse = await getAIResponse(userQuery);

    setChatHistory((prev) => [...prev, { query: userQuery, response: aiResponse }]);
  };

  return (
    <div className="flex flex-col w-full p-4 rounded-lg text-white">
      {/* Chat window */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {chatHistory.map((entry, idx) => (
          <div key={idx} className="flex flex-col space-y-1">
            {/* AI response on left */}
            <div className="flex justify-start">
              <div className="bg-gray-700 text-gray-100 p-3 rounded-lg max-w-xs whitespace-pre-wrap">
                {entry.response}
              </div>
            </div>
            {/* User query on right */}
            <div className="flex justify-end">
              <div className="bg-[#ffa116] text-white p-3 rounded-lg max-w-xs whitespace-pre-wrap">
                {entry.query}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="flex space-x-2">
        <input
          type="text"
          className="flex-1 p-2 rounded-lg outline-none text-white"
          placeholder="Ask about the problem or your code..."
          value={currentQuery}
          onChange={(e) => setCurrentQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="bg-[#ffa116] text-black px-4 rounded-lg font-medium hover:bg-yellow-500"
          onClick={handleSend}
        > 
          Send
        </button>
      </div>
    </div>
  );
};

export default AIChat;
