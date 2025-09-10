import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { AiFillYoutube } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import YouTube from "react-youtube";
import Topbar from "../components/Topbar/Topbar";

interface Props {}

export default function Index({}: Props) {
  const [youtubePlayer, setYoutubePlayer] = useState({ isOpen: false, videoId: "" });
  const [loadingProblems, setLoadingProblems] = useState(true);
  const [problems, setProblems] = useState<any[]>([]);

  // Dark / Light Mode
  const [darkMode, setDarkMode] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [status, setStatus] = useState("All");
  const [tag, setTag] = useState("All");

  // Sorting state
  const [sortConfig, setSortConfig] = useState<{
    key: "srNo" | "title" | "difficulty" | "category";
    direction: "asc" | "desc";
  } | null>(null);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await axios.get("/api/problem");
        setProblems(res.data.problems);
      } catch (error) {
        console.error("Error fetching problems:", error);
      } finally {
        setLoadingProblems(false);
      }
    };
    fetchProblems();
  }, []);

  // Filters
  const filteredProblems = problems.filter((problem) => {
    const matchesSearch = (problem.title ?? "").toLowerCase().includes(search.toLowerCase());
    const matchesDifficulty = difficulty === "All" || problem.difficulty === difficulty;
    const matchesStatus = status === "All" || problem.status === status;
    const matchesTag = tag === "All" || (Array.isArray(problem.tags) && problem.tags.includes(tag));
    return matchesSearch && matchesDifficulty && matchesStatus && matchesTag;
  });

  // Difficulty rank for correct ordering
  const DIFF_RANK: Record<string, number> = { Easy: 0, Medium: 1, Hard: 2 };

  const compareByKey = (
    a: any,
    b: any,
    key: "srNo" | "title" | "difficulty" | "category"
  ) => {
    if (key === "srNo") {
      return Number(a.srNo) - Number(b.srNo);
    }
    if (key === "difficulty") {
      return (DIFF_RANK[a.difficulty] ?? 99) - (DIFF_RANK[b.difficulty] ?? 99);
    }
    return String(a[key] ?? "").localeCompare(String(b[key] ?? ""), undefined, {
      sensitivity: "base",
    });
  };

  const sortedProblems = (() => {
    if (!sortConfig) return filteredProblems;
    const { key, direction } = sortConfig;
    return [...filteredProblems].sort((a, b) => {
      const res = compareByKey(a, b, key);
      return direction === "asc" ? res : -res;
    });
  })();

  const handleSort = (key: "srNo" | "title" | "difficulty" | "category") => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Theme classes
  const bgMain = darkMode ? "bg-[rgb(26,26,26)]" : "bg-white";
  const textMain = darkMode ? "text-white" : "text-gray-800";
  const textSecondary = darkMode ? "text-gray-400" : "text-gray-500";
  const borderColor = darkMode ? "border-gray-400" : "border-gray-300";
  const inputBg = darkMode ? "bg-[rgb(40,40,40)] text-white" : "bg-gray-100 text-black";
  const rowAlt = darkMode ? "bg-[rgba(255,253,253,0.05)]" : "bg-gray-50";

  return (
    <div className={`${bgMain} min-h-screen`}>
      <Topbar />
      <div className="relative overflow-x-auto mx-auto px-6 pb-10">
        <div className="flex flex-col items-center text-sm">
          {/* Dark / Light Toggle */}
          {/* <div className="flex justify-end w-full max-w-[700px] my-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 rounded-lg border border-gray-400 text-sm hover:opacity-80"
            >
              {darkMode ? "Switch to Light Mode 🌞" : "Switch to Dark Mode 🌙"}
            </button>
          </div> */}

          {/* Filters */}
          <div className="flex flex-wrap gap-4 my-4 w-full max-w-[700px] justify-between">
            <input
              type="text"
              placeholder="Search by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`px-3 py-2 rounded-lg w-full sm:w-[200px] ${inputBg}`}
            />
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className={`px-3 py-2 rounded-lg ${inputBg}`}
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={`px-3 py-2 rounded-lg ${inputBg}`}
            >
              <option value="All">All Status</option>
              <option value="Solved">Solved</option>
              <option value="Unsolved">Unsolved</option>
            </select>
            <select
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className={`px-3 py-2 rounded-lg ${inputBg}`}
            >
              <option value="All">All Tags</option>
              <option value="Array">Array</option>
              <option value="String">String</option>
              <option value="DP">DP</option>
              <option value="Graph">Graph</option>
            </select>
          </div>

          {/* Header Row */}
          <div
            className={`flex w-[700px] justify-between px-4 py-2 border-b ${borderColor} text-xs uppercase ${textSecondary}`}
          >
            <button
              onClick={() => handleSort("srNo")}
              className="w-[60px] text-left hover:text-blue-500"
            >
              Sr. No.{" "}
              {sortConfig?.key === "srNo" &&
                (sortConfig.direction === "asc" ? "▲" : "▼")}
            </button>
            <button
              onClick={() => handleSort("title")}
              className="w-[160px] text-left hover:text-blue-500"
            >
              Title{" "}
              {sortConfig?.key === "title" &&
                (sortConfig.direction === "asc" ? "▲" : "▼")}
            </button>
            <button
              onClick={() => handleSort("difficulty")}
              className="w-[120px] text-left hover:text-blue-500"
            >
              Difficulty{" "}
              {sortConfig?.key === "difficulty" &&
                (sortConfig.direction === "asc" ? "▲" : "▼")}
            </button>
            <button
              onClick={() => handleSort("category")}
              className="w-[160px] text-left hover:text-blue-500"
            >
              Category{" "}
              {sortConfig?.key === "category" &&
                (sortConfig.direction === "asc" ? "▲" : "▼")}
            </button>
            <div className="w-[100px]">Solution</div>
          </div>

          {/* Data Rows */}
          {sortedProblems.length > 0 ? (
            sortedProblems.map((problem, idx) => {
              const difficultyColor =
                problem.difficulty === "Easy"
                  ? "text-[rgb(44,187,93)]"
                  : problem.difficulty === "Medium"
                  ? "text-[rgb(255,192,30)]"
                  : "text-[rgb(255,55,95)]";

              return (
                <div
                  key={problem.srNo}
                  className={`flex w-full max-w-[700px] justify-between px-4 py-5 ${
                    idx % 2 === 1 ? rowAlt : ""
                  }`}
                >
                  <div className={`w-[60px] ${textMain}`}>{problem.srNo}.</div>
                  <Link
                    href={`problem/${problem?.id}`}
                    className={`w-[160px] truncate hover:text-blue-500 ${textMain}`}
                  >
                    {problem.title}
                  </Link>
                  <div className={`w-[120px] ${difficultyColor}`}>
                    {problem.difficulty}
                  </div>
                  <div className={`w-[160px] ${textMain}`}>
                    {problem.category}
                  </div>
                  <div className={`w-[100px] flex justify-center ${textMain}`}>
                    {problem.videoId !== "Coming soon" ? (
                      <AiFillYoutube
                        fontSize={"28"}
                        className="cursor-pointer hover:text-red-600"
                        onClick={() =>
                          setYoutubePlayer({
                            isOpen: true,
                            videoId: problem.videoId,
                          })
                        }
                      />
                    ) : (
                      <p className={textSecondary}>Coming soon</p>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            !loadingProblems && (
              <p className={`${textSecondary} mt-6`}>No problems found.</p>
            )
          )}
        </div>
      </div>

      {/* YouTube Modal */}
      {youtubePlayer.isOpen && (
        <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center z-50">
          {/* Overlay */}
          <div
            className="absolute top-0 left-0 w-screen h-screen bg-black opacity-70"
            onClick={() => setYoutubePlayer({ isOpen: false, videoId: "" })}
          ></div>

          {/* Player */}
          <div className="relative w-full max-w-4xl px-6">
            <IoClose
              fontSize={"35"}
              className="cursor-pointer absolute -top-12 right-0 text-white"
              onClick={() => setYoutubePlayer({ isOpen: false, videoId: "" })}
            />
            <YouTube
              videoId={youtubePlayer.videoId}
              loading="lazy"
              iframeClassName="w-full min-h-[500px] rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
