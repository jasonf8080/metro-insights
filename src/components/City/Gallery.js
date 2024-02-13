import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useScroll, useTransform, motion } from 'framer-motion';
import { useGlobalContext } from '../../context';


const Gallery = () => {
    const {cities} = useGlobalContext();

    const [activeIndex, setActiveIndex] = useState(0)
    const [isTransitioning, setIsTransitioning] = useState(null)

    const {id} = useParams();

    const gallery = [0,1,2,3]

    const gallerySection = useRef(null)
    const galleryContainer = useRef(null)
  
    const {scrollYProgress} = useScroll({
        target: gallerySection, 
        offset: ["start end", "end start"]
    })

    useEffect(() => {
        setActiveIndex(0)
    }, [id])
   

    const opacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1])
    
   


    const handleNext = () => {
     
        if(activeIndex >= gallery.length - 1){
            setActiveIndex(0)

        } else {
            setActiveIndex(activeIndex + 1)
        }

        setIsTransitioning('transitionNext')

        setTimeout(() => {
            setIsTransitioning(null)
        }, 1000)

    }

     const handlePrev = () => {
     
        if(activeIndex <= 0){
            setActiveIndex(gallery.length - 1)

        } else {
            setActiveIndex(activeIndex - 1)
        }

        setIsTransitioning('transitionPrev')

          setTimeout(() => {
            setIsTransitioning(null)
        }, 1000)

    }

    const handleResize = () => {
       
         const container = document.querySelector('.gallery-container')
         const containerHeight = document.querySelector('.active-slide').getBoundingClientRect().height;
        
        container.style.height = `${containerHeight}px`
     }

    useEffect(() => {
    
        const container = document.querySelector('.gallery-container')
        const handleImageLoad = () => {
           handleResize();
        };

         //When images load in, then get the height of the container
         const images = document.querySelectorAll('.img-slide');
         images.forEach((img) => {
          img.addEventListener('load', handleImageLoad);
         });

        if(container){
              window.addEventListener('resize', handleResize);
        }
       

    // Cleanup for image load event
        return () => {
        images.forEach((img) => {
            img.removeEventListener('load', handleImageLoad);
        });
        };

   
    }, [])


    



 
//<section className='' ref={gallerySection} style={{}}> 
  return (
    
    
     <motion.section className='my-[50px] md:my-[180px] gallery-section overflow-hidden' ref={gallerySection}>
         <div className="max-w-[80%] mx-auto">
          <h1 className="text-lg md:text-4xl font-bold mb-4 md:mb-10">Gallery</h1>

       
            <motion.div ref={galleryContainer} style={{opacity: opacity}} className={`${isTransitioning && isTransitioning} gallery-container max-w-[99%] min-h-[140px] md:max-w-[70%] mx-auto mb-0 md:mb-20 flex items-center relative md:min-h-[250px] lg:min-h-[350px] z-10 h-auto`}>
                <button className='prev-btn absolute top-[50%] translate-y-[-50%] left-[-15px] border-2 border-white rounded-full p-2 md:p-4 flex justify-center items-center z-20 bg-black bg-opacity-70'
                onClick={handlePrev} disabled={isTransitioning}>
                    <FaArrowLeft/>
                </button>

                <button className='next-btn absolute top-[50%] translate-y-[-50%] right-[-15px] border-2 border-white rounded-full p-2 md:p-4 flex justify-center items-center z-20 bg-black bg-opacity-70'
                onClick={handleNext} disabled={isTransitioning}>
                <FaArrowRight/>
                </button>

                {gallery.map((item, index) => {
                    const lastItem = gallery.length - 1;

                    return <img className=
                    {`${
                    activeIndex === 0 && index === lastItem ? 'prev-slide'
                    : activeIndex === lastItem && index === 0 ? 'next-slide'
                    : index === activeIndex - 1 ? 'prev-slide'
                    : index === activeIndex + 1 ? 'next-slide' 
                    : index === activeIndex ? 'translate-x-0 min-w-full z-10 active-slide'
                    : 'opacity-0 hide-slide'
                    } img-slide h-auto absolute top-0 left-0 rounded-lg`} src={`/images/${cities[id].location.replace(/\s/g, '')}-${index + 1}.jpg`}
                    key={index}
                    alt='/'/>
                })}
            
            </motion.div>
    

            <motion.div style={{opacity: opacity}} className="flex justify-between items-center max-w-[70%] md:max-w-[90%] mx-auto mt-[20px] md:mt-[100px]">
                <p className='mr-0 md:mr-2 text-sm md:text-2xl'>{activeIndex + 1} / 4</p>
                <div className="w-[80%] md:w-[90%] bg-[#333] h-2 md:h-3 rounded-md relative">
                    <div style={{width: `${((activeIndex + 1) / 4) * 100}%`}} className="gallery-slider-width absolute top-0 left-0 bg-white h-full rounded-md"></div>
                </div>
                
            </motion.div>
        </div>
    </motion.section>

  
 
  )
}

export default Gallery