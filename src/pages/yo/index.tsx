// // pages/test.tsx
// import { useRecoilState } from 'recoil';
// import { authModalState } from '../../atoms/authModalAtom';

// const TestPage = () => {
//     const [modalState, setModalState] = useRecoilState(authModalState);

//   return (
//     <div style={{ padding: 40 }}>
//       <h1>Test Recoil</h1>
//       <p>Modal is {modalState.isOpen ? 'Open' : 'Closed'}</p>
//       <button onClick={() => setModalState(prev => ({ ...prev, isOpen: !prev.isOpen }))}>
//         Toggle Modal
//       </button>
//     </div>
//   );
// };

// export default TestPage;



import Navbar from '@/components/Navbar/Navbar';
import Topbar from '@/components/Topbar/Topbar';
import Link from 'next/link';
import React, { useState,useEffect } from 'react';
import YouTube from "react-youtube";
import { AiFillYoutube } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
 import axios from 'axios';

type Props = {};

export default function Index({}: Props) {
  const [youtubePlayer, setYoutubePlayer] = useState({
    isOpen: false,
    videoId: "",
  });

  const closeModal = () => {
    setYoutubePlayer({ isOpen: false, videoId: "" });
  };

  const [loadingProblems, setLoadingProblems] = useState(true);

  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await axios.get('/api/problem');
        setProblems(res.data.problems);
      } catch (error) {
        console.error('Error fetching problems:', error);
      } finally {
        setLoadingProblems(false);
      }
    };

    fetchProblems();
  }, []);


  return (
    <div className="bg-[rgb(26,26,26)] h-full">
      <Topbar />

      <h1 className="text-2xl text-center text-gray-700 dark:text-gray-400 font-medium uppercase mt-10 mb-5">
        &ldquo; QUALITY OVER QUANTITY &rdquo; 👇
      </h1>

      <div className="relative overflow-x-auto mx-auto px-6 pb-10">

        <div className="flex items-center flex-col text-sm">
          {/* Header Row */}
          <div className="flex w-[700px] justify-between px-4 py-2 border-b border-gray-400">
            <div className="w-[60px] text-xs text-gray-700 uppercase dark:text-gray-400">
              Sr. No.
            </div>
            <div className="w-[160px] text-xs text-gray-700 uppercase dark:text-gray-400">
              Title
            </div>
            <div className="w-[120px] text-xs text-gray-700 uppercase dark:text-gray-400">
              Difficulty
            </div>
            <div className="w-[160px] text-xs text-gray-700 uppercase dark:text-gray-400">
              Category
            </div>
            <div className="w-[100px] text-xs text-gray-700 uppercase dark:text-gray-400">
              Solution
            </div>
          </div>

        <div className="max-w-[1200px] mx-auto sm:w-7/12 w-full">
          {loadingProblems && (
            <div className="animate-pulse">
              {[...Array(10)].map((_, idx) => (
                <LoadingSkeleton key={idx} />
              ))}
            </div>
          )}
        </div>
          {/* Data Rows */}
          {problems &&
            problems.map((problem, idx) => {
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
                    idx % 2 === 1 ? "bg-[rgba(255,253,253,0.05)]" : ""
                  }`}
                >
                  <div className="w-[60px] text-white shrink-0">{problem.srNo}.</div>

                  <Link
                    href={`problem/${problem?.id}`}
                    className="w-[160px] text-white hover:text-blue-500 truncate shrink-0"
                  >
                    {problem.title}
                  </Link>

                  <div className={`w-[120px] ${difficultyColor} shrink-0`}>
                    {problem.difficulty}
                  </div>

                  <div className="w-[160px] text-white shrink-0">{problem.category}</div>

                  <div className="w-[100px] text-white shrink-0 flex justify-center items-center">
                    {problem.videoId !== "Coming soon" ? (
                      <AiFillYoutube
                        fontSize={"28"}
                        className="cursor-pointer hover:text-red-600"
                        onClick={() =>
                          setYoutubePlayer({ isOpen: true, videoId: problem.videoId })
                        }
                      />
                    ) : (
                      <p className="text-gray-400">Coming soon</p>
                    )}
                  </div>
                </div>
              );
            })}

          {youtubePlayer.isOpen && (
            <tfoot className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center">
              <div
                className="bg-black z-10 opacity-70 top-0 left-0 w-screen h-screen absolute"
                onClick={closeModal}
              ></div>
              <div className="w-full z-50 h-full px-6 relative max-w-4xl">
                <div className="w-full h-full flex items-center justify-center relative">
                  <div className="w-full relative">
                    <IoClose
                      fontSize={"35"}
                      className="cursor-pointer absolute -top-16 right-0"
                      onClick={closeModal}
                    />
                    <YouTube
                      videoId={youtubePlayer.videoId}
                      loading="lazy"
                      iframeClassName="w-full min-h-[500px]"
                    />
                  </div>
                </div>
              </div>
            </tfoot>
          )}
        </div>
      </div>
    </div>
  );
}

const LoadingSkeleton = () => {
  return (
    <div className="flex items-center space-x-12 mt-4 px-6">
      <div className="w-6 h-6 shrink-0 rounded-full bg-[rgb(40,40,40)]"></div>
      <div className="h-4 sm:w-52 w-32 rounded-full bg-[rgb(40,40,40)]"></div>
      <div className="h-4 sm:w-52 w-32 rounded-full bg-[rgb(40,40,40)]"></div>
      <div className="h-4 sm:w-52 w-32 rounded-full bg-[rgb(40,40,40)]"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

