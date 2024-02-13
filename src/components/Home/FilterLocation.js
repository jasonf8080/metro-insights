import React, {useState, useRef, useEffect} from 'react'
import { IoChevronDownSharp } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { motion, AnimatePresence, useScroll, useTransform} from 'framer-motion';
import Slide from '../Slide';
import SliderWidth from '../SliderWidth';
import { useGlobalContext } from '../../context';

const regionOptions = [
  'north america',
  'south america',
  'europe',
  'asia',
  'africa',
  'austrailia'
]


const FilterLocation = () => {

  const [showRegions, setShowRegions] = useState(false) //show regions menu
  const [currentRegion, setCurrentRegion] = useState('north america') 

  const innerSlider = useRef(null)
  const filterLocationSection = useRef(null)

  const {cities} = useGlobalContext();

  const {scrollYProgress} = useScroll({
    target: filterLocationSection,
    offset: ['start end', 'end start']
  })


  const filterItemsOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  const filterItemsY = useTransform(scrollYProgress, [0, 0.2], ['-20px', '0px'])
  const slidesOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])

  const [sliderPosition, setSliderPosition] = useState(0)

  




useEffect(() => {
  
   if(innerSlider.current){
      innerSlider.current.addEventListener('scroll', () => { 
        const currentScroll = innerSlider.current.scrollLeft;
        const maxScroll = innerSlider.current.scrollWidth - innerSlider.current.clientWidth;

       setSliderPosition((currentScroll / maxScroll) * 100)
       
      })
    }
   
}, []);


useEffect(() => {
  if(showRegions){
     const position = window.scrollY;


    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      
       if(currentScroll < position - 170 ){
        setShowRegions(false)
       }
    })
  }
}, [showRegions])
 



  

  return (
    <section ref={filterLocationSection} className="filter-by-location-section relative h-[90vh] py-[40px] pt-[130px] translate-y-[-300px]">
     <div className="top-overlay absolute w-full top-0 left-0 h-[5vh] z-10"></div>
     <img className='grayscale min-w-full absolute bottom-0 left-0 max-w-full object-cover min-h-[100%] max-h-[100%] z-10' src={'https://images.pexels.com/photos/548084/pexels-photo-548084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'} alt='/'></img> 
     <div className="main-overlay absolute top-0 left-0 min-w-full max-w-full z-30 min-h-full"></div>

     <div className="container relative z-90">
        <div className="location-filter flex items-center">
            <motion.div style={{opacity: filterItemsOpacity, y: filterItemsY}} className='dropdown mr-2 md:mr-4 relative bg-[#222] p-2 md:p-4 rounded-md flex items-start border-2 border-white z-[100]'>
                <button className='mr-2 md:mr-4 text-md md:text-xl cursor-pointer'  onClick={() => filterItemsOpacity.current >= 0.8 && setShowRegions(!showRegions)}>
                <IoChevronDownSharp/>
              </button>
              <span className='text-2xl'>
                <IoLocationOutline/>
              </span>

            <AnimatePresence mode='wait'>
            {showRegions && 
            <motion.div 
            className='absolute top-[100%] mt-6 left-0 min-w-[300px] md:min-w-[330px] py-4 px-8 border-2 border-white bg-[#222] z-200 rounded-md'
              initial={{opacity: 0, y: -20}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.25}}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.25 } }}
            >
                {regionOptions.map((item, index) => {
                    return <p key={index} className='py-2 md:py-3  text-xs md:text-lg flex items-center justify-between cursor-pointer' onClick={() => {
                      setCurrentRegion(item)
                      innerSlider.current.scrollLeft = 0;
                      setTimeout(() => {
                        setShowRegions(false)
                      }, 250)
                      
                      }}>
                      {item}
                    {item === currentRegion && <span><FaCheck/></span>}
                      </p>
                })}
              </motion.div>}
              </AnimatePresence>
            </motion.div>

        <motion.div style={{opacity: filterItemsOpacity, y: filterItemsY}} className="bg-[#222] py-3 md:py-4 px-5 md:px-10 rounded-md flex justify-center items-start z-[999] border-2 border-white">
          <p className='text-xs md:text-lg'>{currentRegion}</p>
        </motion.div>
      </div>

    <div className="slider-container overflow-hidden max-w-full mt-5 md:mt-10 relative  z-[70]">
        <motion.div style={{opacity: slidesOpacity}} className="slider-inner-container overflow-scroll pt-2  pb-3 md:pb-10 flex items-center relative" ref={innerSlider}>
          
            <AnimatePresence mode='wait'>
              {cities
                  .filter((item) => item.continent === currentRegion)
                  .map((item, index) => (
                    <Slide classProp={'big-slide'} key={item.id} index={index} {...item} />
                  ))}
              </AnimatePresence>
        
          </motion.div>

          <SliderWidth sliderPosition={sliderPosition}/>
    </div>
  </div>

</section>




  )
}

export default FilterLocation