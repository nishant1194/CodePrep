import React from 'react'
import Image from "next/image";
import { useRouter } from 'next/router';
import Link from 'next/link';


type Props = {}
const Topbar = (props: Props) => {
  const router = useRouter();
  const handleClick = () => {
  router.push('/auth');
};

  return (
    <div className='bg-[rgb(40,40,40)] flex items-center justify-between sm:px-12 px-2 py-3 md:px-32'>
      <Link href={'/'}>
      <Image src='/logo-full.png' alt='LeetClone' height={100} width={100} />
      </Link>  
       <button
					className='bg-[#ffa116] text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium
                hover:text-[#ffa116] hover:bg-white hover:border-2 hover:border-brand-orange border-2 border-transparent
                transition duration-300 ease-in-out
                '
					onClick={handleClick}
				>
					Sign In
				</button>
    </div>
  )
}

export default Topbar;