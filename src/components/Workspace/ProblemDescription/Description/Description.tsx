import React from 'react'
import { AiFillLike, AiFillDislike, AiFillStar } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";
type Props = {}

const Description = ({problem}) => {
    const difficultyClass = {
    Easy: "bg-[rgb(0,184,163)] text-olive",
    Medium: "bg-[rgb(255,192,30)] text-white",
    Hard: "bg-[rgb(255,55,95)] text-dark-pink"
  };
  return (
     <div className='flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto'>
        <div className='px-5'>
          {/* Problem heading */}
          <div className='w-full'>
            <div className='flex space-x-4'>
              <div className='flex-1 mr-2 text-lg text-white font-medium'>{problem.title}</div>
            </div>

            <div className='flex items-center mt-3'>
              <div
                className={`${difficultyClass[problem.difficulty]} inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize `}
              >
                {problem.difficulty}
              </div>
              <div className='rounded p-[3px] ml-4 text-lg text-green-s'>
                <BsCheck2Circle />
              </div>
              <div className='flex items-center space-x-1 rounded p-[3px] ml-4 text-lg text-dark-gray-6'>
                <AiFillLike />
                <span className='text-xs'>{problem.likes}</span>
              </div>
              <div className='flex items-center space-x-1 rounded p-[3px] ml-4 text-lg text-dark-gray-6'>
                <AiFillDislike />
                <span className='text-xs'>{problem.dislikes}</span>
              </div>
              <div className='rounded p-[3px] ml-4 text-xl text-dark-gray-6'>
                <TiStarOutline />
              </div>
            </div>

            {/* Problem Statement */}
            <div className='text-white text-sm mt-4'>
              <div dangerouslySetInnerHTML={{ __html: problem.problemStatement }} />
            </div>

            {/* Examples */}
            <div className='mt-4'>
              {problem.examples.map((example, index) => (
                <div key={example.id}>
                  <p className='font-medium text-white '>Example {index + 1}: </p>
                  {example.img && <img src={example.img} alt='' className='mt-3' />}
                  <div className='example-card'>
                    <pre>
                      <strong className='text-white'>Input: </strong> {example.inputText}
                      <br />
                      <strong>Output:</strong> {example.outputText} <br />
                      {example.explanation && (
                        <>
                          <strong>Explanation:</strong> {example.explanation}
                        </>
                      )}
                    </pre>
                  </div>
                </div>
              ))}
            </div>

            {/* Constraints */}
            <div className='my-8 pb-4'>
              <div className='text-white text-sm font-medium'>Constraints:</div>
              <ul className='text-white ml-5 list-disc '>
                <div className="mt-2" dangerouslySetInnerHTML={{ __html: problem.constraints }} />
              </ul>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Description