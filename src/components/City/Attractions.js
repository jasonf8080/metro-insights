import { motion } from 'framer-motion'
import React, { useRef } from 'react'

import { useParams } from 'react-router-dom';
import Attraction from './Attraction';



const Attractions = () => {
    
    const {id} = useParams();
  

     const attractionsSection = useRef(null);

     const attraction1 = useRef(null)
     const attraction2 = useRef(null)
     const attraction3 = useRef(null)

     

  return (
    <>
    <motion.section ref={attractionsSection} className="translate-y-[-50px] py-10 overflow-hidden">
       <div className="max-w-[80%] mx-auto">
        <h1 className="text-xl md:text-4xl font-bold mb-7 md:mb-10">Attractions</h1>

       <div className="grid grid-cols-1 gap-[150px]">
          <Attraction id={id} index={0} refValue={attraction1}/>
          <Attraction id={id} index={1} refValue={attraction2}/>
          <Attraction id={id} index={2} refValue={attraction3}/>
        </div>
       </div>
    </motion.section>

    

  

</>

  )
}

export default Attractions