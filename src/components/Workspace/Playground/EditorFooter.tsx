import React, { useState } from "react";
import { BsChevronUp } from "react-icons/bs";


const EditorFooter = ({ handleSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <div className="flex bg-[rgb(40,40,40)] absolute bottom-0 z-10 w-full">
      <div className="mx-5 my-[10px] flex justify-between w-full">
        <div className="mr-2 flex flex-1 flex-nowrap items-center space-x-4">
          <button className="px-3 py-1.5 font-medium items-center transition-all inline-flex bg-[hsla(0,0%,100%,.1)] text-sm hover:bg-dark-fill-2 text-dark-label-2 rounded-lg pl-3 pr-2">
            Console
            <div className="ml-1 transform transition flex items-center">
              <BsChevronUp className="fill-gray-6 mx-1 fill-dark-gray-6" />
            </div>
          </button>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <button
            className="px-3 py-1.5 text-sm font-medium items-center whitespace-nowrap transition-all focus:outline-none inline-flex bg-[hsla(0,0%,100%,.1)]  hover:bg-[hsla(0,0%,100%,.14)] text-dark-label-2 rounded-lg"
            onClick={handleSubmit}
          >
            Run
          </button>
      <button
  className='
    px-3 py-1.5 font-medium items-center transition-all focus:outline-none 
    inline-flex text-sm text-white bg-[rgb(44,187,93)] 
    hover:bg-[#28924dff] rounded-lg
  '
  onClick={handleSubmit}
>
  Submit
</button>

        </div>
      </div>
    </div>
  );
};
export default EditorFooter;
