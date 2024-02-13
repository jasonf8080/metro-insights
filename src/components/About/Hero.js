import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { FaRegCircle } from "react-icons/fa";
import { useGlobalContext } from '../../context';


const Hero = () => {
    const aboutSection = useRef(null)

  const {image} = useGlobalContext();

  return (
    <>
  
    <section ref={aboutSection} className='about-section relative min-h-[95vh] grid grid-cols-1  md:grid-cols-2'>
        <div className='min-w-full max-w-full  min-h-[45vh] max-h-[45vh] md:min-h-[95vh] md:max-h-[95vh] relative'>
            <motion.img
            initial={{x: '-70px', opacity: 0}}
            animate={{x: '0px', opacity: 1}}
            transition={{duration: 1}} 
            src={image}
            className="min-w-full max-w-full object-cover min-h-[45vh] max-h-[45vh] md:min-h-[95vh] md:max-h-[95vh] z-0" alt=""
           />
           <div className="absolute top-0 right-0 w-[100%] md:w-[90%]  h-[45vh] md:h-full bg-gradient-to-b md:bg-gradient-to-r from-transparent to-black"></div>
        </div>
        

         
        <div className="md:flex justify-center items-center bg-black">
            <motion.div className='max-w-[80%] md:max-w-[70%] mx-auto'
             initial={{x: '-70px', opacity: 0, y: '-70px'}}
            animate={{x: '0px', opacity: 1}}
            transition={{duration: 1, delay: 1}} 
            >
                <div className='relative mb-6 lg:mb-10 max-w-[220px] '>
                    <h1 className="text-2xl lg:text-4xl font-bold pb-4">our story</h1>
                    <div className="absolute top-[100%] left-0 w-full grid grid-cols-[1fr,40px,1fr]">
                        <motion.div
                            initial={{width: '0%'}}
                            animate={{width: '100%'}}
                            transition={{duration: 1, delay: 2}}
                           className="h-[5px] w-full bg-white transform origin-left">
                         </motion.div>

                         <motion.span 
                           initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{duration: 1, delay: 2}}
                           className='flex justify-center items-center translate-y-[-5px]'><FaRegCircle/></motion.span>

                       <motion.div
                            initial={{width: '0%'}}
                            animate={{width: '100%'}}
                            transition={{duration: 1, delay: 2}}
                           className="h-[5px] w-full bg-white transform origin-right">
                         </motion.div>
                    </div>
                </div>
                <p className='text-xs leading-[1.5rem] md:leading-[2rem] lg:text-lg lg:leading-[2rem]'>Welcome to Metro Insights, your go-to destination for a captivating exploration of the world's most iconic cities! Our journey began with a simple yet profound idea: to create a platform that celebrates the rich tapestry of cities and their unique attractions. </p>
            </motion.div>
        </div>
    </section>

    </>
  )
}

export default Hero