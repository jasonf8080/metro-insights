import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useGlobalContext } from '../../context'


const Attraction = ({id, index, refValue}) => {

   const {cities} = useGlobalContext();

    const {scrollYProgress} = useScroll({
        target: refValue,
        offset: ["start end", "end start"]
    })

    const opacity = useTransform(scrollYProgress, [0, 0.2], [0,1])
    const x = useTransform(scrollYProgress, [0, 0.2], ['-100px','0px'])
    const altX = useTransform(scrollYProgress, [0, 0.2], ['100px','0px'])


  return (
    <motion.div style={{opacity: opacity, x: index === 1 ? altX : x}} ref={refValue} 
     className='attraction-section rounded-lg max-w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12'>
        <motion.img 
        src={`/images/${cities[id].location.replace(/\s/g, '')}${index + 1}.jpg`} className={`${index === 1 ? 'order-3' : 'order-[-1]'} relative max-w-full h-auto min-w-full rounded-lg z-[999]`}/>
        <motion.div className="content pt-0 md:pt-10">
                <h2 className="font-bold mb-3 md:mb-6 text-lg md:text-xl lg:text-3xl">{cities[id].attractions[index].title}</h2>
                <p className='text-xs leading-[1.5rem] md:leading-[2rem] lg:leading-[2.5rem] md:text-md lg:text-lg'>{cities[id].attractions[index].content}</p>
                
        </motion.div>
    </motion.div>
  )
}

export default Attraction

