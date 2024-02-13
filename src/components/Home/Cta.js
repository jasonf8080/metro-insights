import { useScroll, useTransform, motion } from 'framer-motion'
import React, { useRef } from 'react'
import { Link } from 'react-router-dom'

const Cta = () => {
  const ctaRef = useRef(null)

  const {scrollYProgress} = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"]
  })

  const scale = useTransform(scrollYProgress, [0, 0.3], [0.85, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  
  return (
    <section className='pb-[40px] md:pb-0 translate-y-[-140px] md:translate-y-[-100px]' ref={ctaRef}>
        <motion.div style={{scale: scale, opacity: opacity}} className="container flex justify-center items-center flex-col min-h-[20vh] md:min-h-[50vh]">
           <p className='text-sm md:text-2xl text-center'>Explore our story and mission on our About Page! Uncover the inspiration behind our website. Click here to learn more.</p>
           <Link to='/about' className='cta-btn relative mt-6 uppercase rounded-md px-6 py-3 text-xs md:text-md'>View More</Link>
        </motion.div>
    </section>
  )
}

export default Cta