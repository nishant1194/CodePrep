import { useState } from "react";
import { AiFillLike, AiFillDislike, AiFillStar } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";
import Description from "./Description/Description";
import MySubmissions from "./MySubmissions/MySubmissions";
import Solution from "./Solution/Solution";
import AIChat from "./AIChat/AIChart";

type Example = {
  id: number;
  inputText: string;
  outputText: string;
  explanation?: string;
  img?: string;
};

 
const ProblemDescription = ({problem , userCode}) => {
const [tab, setTab] = useState("Description");
  const difficultyClass = {
    Easy: "bg-[rgb(0,184,163)] text-olive",
    Medium: "bg-[rgb(255,192,30)] text-black",
    Hard: "bg-[rgb(255,55,95)] text-dark-pink"
  };

  return (
    <div className='bg-[rgb(40,40,40)] h-[95vh]'>
      {/* TAB */}
      <div className='flex h-11 w-full items-center pt-2 bg-[rgb(26,26,26)] text-white overflow-x-hidden'>
        <div onClick={ () =>{setTab('Description')}} className={`bg-${tab === 'Description'?'[rgb(40,40,40)]':'[rgb(26,26,26)]'} rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer`}>
          Description
        </div>
        <div onClick={ () =>{setTab('My Submissions')}} className={`bg-${tab === 'My Submissions'?'[rgb(40,40,40)]':'[rgb(26,26,26)]'} rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer`}>
          My Submissions
        </div>
        <div onClick={ () =>{setTab('Solution')}} className={`bg-${tab === 'Solution'?'[rgb(40,40,40)]':'[rgb(26,26,26)]'} rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer`}>
          Solution
        </div>
        <div onClick={ () =>{setTab('AI')}} className={`bg-${tab === 'AI'?'[rgb(40,40,40)]':'[rgb(26,26,26)]'} rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer`}>
          AI
        </div>
      </div>
      {tab === 'Description' &&<Description problem={problem} /> }
      {tab === 'My Submissions' &&<MySubmissions problem={problem} /> }
      {tab === 'Solution' &&<Solution problem={problem} /> }
      {tab === 'AI' &&<AIChat problem={problem} userCode={userCode} /> }

     
    </div>
  );
};

export default ProblemDescription;
