import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FaArrowDown } from "react-icons/fa";

import Slide from '../Slide';
import { removeOverlay, scrollToValue } from '../../helpers';
import SliderWidth from '../SliderWidth'
import { useGlobalContext } from '../../context';

const Hero = () => {

  const [sliderPosition, setSliderPosition] = useState(0)
  const headerSection = useRef(null)
  const featuredSection = useRef(null)
  const innerSlider = useRef(null)

  const {cities, image} = useGlobalContext();



  const {scrollYProgress} = useScroll({
        target: headerSection,
        offset: ["end end", "end start"]
    })

  const backgroundY = useTransform(scrollYProgress, [0.1, 1], ['0%', '-50%'])
  const opacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1])

  

//Control slider width
useEffect(() => {

   if(innerSlider.current){
      innerSlider.current.addEventListener('scroll', () => { 
        const currentScroll = innerSlider.current.scrollLeft;
        const maxScroll = innerSlider.current.scrollWidth - innerSlider.current.clientWidth;

       setSliderPosition((currentScroll / maxScroll) * 100)
       
      })
    }
   
}, []);


    //Remove fade-in background so link can be clicked
    useEffect(() => {
      removeOverlay('.fade-in-overlay')
    }, [])
    
   
    const goToFeatured = () => {

        if(window.innerWidth >= 768){
           //Desktop
           scrollToValue(500)
           console.log('desktop')
        } else {
           //Mobile 
           scrollToValue(380)
           console.log('mobile')
        }   

    }

 


    
  return (
    <>
    {/* Hero */}
    <section id='headerSection' ref={headerSection} className="header-section relative min-h-[85vh] max-h-[85vh] sm:min-h-[95vh] sm:max-h-[95vh] flex justify-center items-center overflow-hidden">
      <motion.img
       src={image} alt='/'
        className='min-w-full absolute top-0 left-0 max-w-full object-cover min-h-[85vh] max-h-[85vh] sm:min-h-[95vh] sm:max-h-[95vh] z-0'
        initial={{scale: 1.1}}
        animate={{scale: 1}}
        transition={{duration: 2}}
        >
        
      </motion.img>


      <motion.div className='overlay fade-in-overlay absolute top-0 left-0 max-w-full min-w-full min-h-[85vh] max-h-[85vh] sm:min-h-[95vh] sm:max-h-[95vh] z-[222] bg-black'
        initial={{opacity: 1}}
        animate={{opacity: 0}}
        transition={{duration: 3}}
      >
        
      </motion.div>

      <div className="main-overlay absolute top-0 left-0 min-w-full max-w-full min-h-[85vh] max-h-[85vh] sm:min-h-[95vh] sm:max-h-[95vh]"></div>

      <div className="text-center z-10 max-w-xl">
        <h1 className='font-bold text-2xl md:text-5xl mb-6'>Metro Insights</h1>

        <p className='max-w-[80%] leading-[1.5rem] text-xs md:text-lg mx-auto'>Metro Insight is a comprehensive city information platform designed to offer users a detailed exploration of urban landscapes.</p>
      </div>

      
      {/* Ensure the bottom-overlay has a higher z-index than the image */}
      <div className="bottom-overlay absolute w-full bottom-0 left-0 h-[20vh] z-10 flex justify-center items-center">
        <motion.button onClick={goToFeatured}
         className="cursor-pointer z-[999] relative arrow-btn rounded-full bg-black flex justify-center items-center w-[60px] h-[60px] border-[1px] border-white translate-y-5"
         initial={{opacity: 0}}
         animate={{opacity: 1}}
         transition={{duration: 1, delay: 2}}
         >
            <FaArrowDown/>
        </motion.button>
      </div>
    </section>

    
    {/*Featured Section */}
    <motion.div id='featuredSection' ref={featuredSection} style={{y: backgroundY}} className="featured-section pt-[70px] pb-[130px] md:pt-[130px] md:pb-[130px] z-[999] relative bg-black">
        <motion.div style={{opacity: opacity}} className="container">
                <div>
                    <h1 className="heading text-lg md:text-4xl font-bold mb-5">Popular Cities</h1>

                    <p className='featured-p text-xs leading-[1.5rem] md:text-lg'>Discover iconic destinations in our Featured Cities section, highlighting the world's most renowned urban landscapes. </p>
                </div>

                <div>
                    <div className="slider-container overflow-hidden max-w-full mt-10 relative z-70">
                        <div ref={innerSlider} className="slider-inner-container overflow-auto pt-2 pb-3 md:pb-10 flex items-center relative">
                          <AnimatePresence mode='wait'>
                            {cities
                              .filter((item) => item.featured === true)
                                .map((item, index) => (
                                  <Slide classProp={'big-slide'} key={item.id} index={index} {...item} />
                                ))}
                            </AnimatePresence>
                          </div>

                          <SliderWidth sliderPosition={sliderPosition}/>
                  </div>
                </div>
        </motion.div>
    </motion.div>
    </>
  )
}

export default Hero