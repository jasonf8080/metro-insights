import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Slide = ({classProp, index, id, location, country, nextLocation}) => {

  return (
   
    <Link to={`/city/${id}`}>
    <motion.div className={`${classProp} ${nextLocation ? 'mr-0 md:mr-8' : 'mr-4 md:mr-8'} cursor-pointer relative rounded-lg shadow-lg shadow-[#1b1b1b] z-50`}
    initial={{opacity: 0}}
    animate={{opacity: 1, transition: {duration: 1, delay: 1 + (index / 4)}}}
    exit={{opacity: 0, transition: { duration: 0.5 } }}>
      
        <img src={`/images/${location.replace(/\s/g, '')}.jpg`} className='rounded-lg object-cover' alt='/'/>

        <div className="card-overlay p-6 w-full absolute bottom-0 left-0 rounded-lg">
            <p className='text-sm md:text-lg mb-1 md:mb-2 font-bold'>{location}</p>
            <p className="text-[0.5rem] md:text-xs">{country}</p>
        </div>
    </motion.div>
    </Link>
   
  )
}

export default Slide