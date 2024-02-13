import React, { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'

import { useGlobalContext } from '../../context'
import { removeOverlay } from '../../helpers'


const Hero = () => {

    const {id} = useParams();
    const targetRef = useRef(null)

    const {image, cities} = useGlobalContext();

    const {scrollYProgress} = useScroll({
      target: targetRef,
      offset: ["end end", "end start"]
    })

   
    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '-50%'])
    const opacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1])

    //Remove fade-in background so link can be clicked
    useEffect(() => {
      removeOverlay('.fade-in-overlay')
    }, [])
   


  return (
    <>
      <section ref={targetRef} className="header-section relative min-h-[85vh] max-h-[85vh] sm:min-h-[95vh] sm:max-h-[95vh] flex justify-center items-center overflow-hidden">
      <motion.img key={id} src={image} alt='/'
        className='min-w-full absolute top-0 left-0 max-w-full object-cover min-h-[85vh] max-h-[85vh] sm:min-h-[95vh] sm:max-h-[95vh] z-0'
        initial={{scale: 1.1}}
        animate={{scale: 1}}
        transition={{duration: 2}}
        >
        
      </motion.img>


      <motion.div key={id} className='fade-in-overlay overlay absolute top-0 left-0 max-w-full min-w-full min-h-[85vh] max-h-[85vh] sm:min-h-[95vh] sm:max-h-[95vh] z-[222] bg-black'
        initial={{opacity: 1}}
        animate={{opacity: 0}}
        transition={{duration: 3}}
      >
        
      </motion.div>

      <div className="main-overlay absolute top-0 left-0 min-w-full max-w-full min-h-[85vh] max-h-[85vh] sm:min-h-[95vh] sm:max-h-[95vh] "></div>

      <div className="text-center z-10 max-w-xl translate-y-[-20px] md:translate-y-0">
        <h1 className='font-bold text-2xl md:text-5xl mb-3 md:mb-6'>{cities[id].location}</h1>

        <p className='max-w-[100%] text-sm md:text-xl mx-auto'>{`${cities[id].country !== 'austrailia' ? `${cities[id].country}, ${cities[id].continent}` : `${cities[id].country}`}`}</p>
      </div>
      {/* Ensure the bottom-overlay has a higher z-index than the image */}
      <div className="bottom-overlay absolute w-full bottom-0 left-0 h-[20vh] z-2 flex justify-center items-center">
       
         
       
      </div>
    </section>

    <motion.section style={{y: backgroundY}}>
      <section className='z-[999] bg-black min-h-[50vh] border-red flex justify-center items-center pt-10'>
        <motion.div style={{opacity: opacity}} className="mx-auto max-w-[80%]">
          <p className='text-xs md:text-sm my-8 md:my-12'><Link to='/' className='cursor-pointer'>Home</Link>  /  {cities[id].location}</p>
          <h1 className="text-lg md:text-4xl font-bold mb-4 md:mb-6">About </h1>

          <p className='leading-[2rem] md:leading-[2.5rem] text-xs md:text-lg'>
           {cities[id].about}
          </p>
        </motion.div>    
     </section>

    
    
    </motion.section>
    </>
  )
}

export default Hero