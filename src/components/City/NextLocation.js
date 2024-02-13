import React, { useState, useEffect, useRef } from 'react'
import Slide from '../Slide'
import { FaArrowRight } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { useScroll, useTransform, motion } from 'framer-motion'
import { useGlobalContext } from '../../context'
import { Link } from 'react-router-dom'

const NextLocation = () => {

    const {id} = useParams();
    const nextLocationSection = useRef(null)
    const {cities} = useGlobalContext();

   const [nextLocation, setNextLocation] = useState(null)

   const {scrollYProgress} = useScroll({
     target: nextLocationSection,
     offset: ["start end", "end start"]
   })

   const opacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1])
   const x = useTransform(scrollYProgress, [0.1, 0.2], ['-50px', '0px'])

    const getNextLocation = () => {
      let next;
      const nextValue = cities.find((item) => item.id > id && item.continent === cities[id].continent);

      if(nextValue){
         next = nextValue
      } else {
         const firstValue = cities.find((item) => item.id < id && item.continent === cities[id].continent)
         next = firstValue
      } 
      
      //setup if(null){find first index: alwaus going to be a next}
      setNextLocation(next)
    }

    useEffect(() => {
      getNextLocation();
  }, [id])

  return (
    <section className="my-20 translate-y-[50px] md:translate-y-0 pb-[170px] md:my-60 md:pb-0 next-location-section" ref={nextLocationSection}>
    <div className="mx-auto max-w-[80%]">
        <h1 className="text-lg md:text-4xl font-bold mb-4 md:mb-6">Next Location</h1>
            <motion.div style={{ opacity: opacity, x: x }} className="grid grid-cols-1 md:grid-cols-[1fr,1.25fr] gap-6">
            {nextLocation && <Slide {...nextLocation} nextLocation={true}/> }
            
            <div className='pt-3 md:pt-8'>
                <p className='text-xs md:text-xl'>{`Click here to view information about ${nextLocation && nextLocation.location}`}
                 <Link to={`/city/${nextLocation && nextLocation.id}`}>
                  <button className='inline ml-6 rounded-full p-2 translate-y-[5px] border-2 border-white'><FaArrowRight/></button>
                </Link>
                </p>
            </div>
           </motion.div>
    </div>
    </section>
  )
}

export default NextLocation