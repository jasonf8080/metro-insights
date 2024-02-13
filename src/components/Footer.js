import React from 'react'
import { FaArrowUp } from 'react-icons/fa'

import { scrollToTop } from '../helpers';
import { useGlobalContext } from '../context';


const Footer = () => {

  const {loading} = useGlobalContext();
  

  return (
   <section className={`${loading && 'hidden'} w-full py-4  bg-[#222]`}>
    <div className="container flex justify-between items-center">
       <p className='text-xs md:text-lg'>&copy; 2023 Metro Insights</p>
       <button onClick={scrollToTop} className='rounded-lg bg-[#333] p-2 md:p-5'><FaArrowUp/></button>
    </div>
   </section>
  )
}

export default Footer