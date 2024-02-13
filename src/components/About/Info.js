import React, { useRef } from 'react'
import InfoItem from './InfoItem'
import { IoIosSearch } from "react-icons/io";
import { GrMapLocation } from "react-icons/gr";
import { IoCameraOutline } from "react-icons/io5";



const Info = () => {

  return (
    <>
    <section className='py-12 md:py-40 bg-[#111]'>
        <div className='max-w-[80%] mx-auto'>
            <h1 className="text-lg md:text-4xl font-bold mb-3 md:mb-6">What we do</h1>
            <p className='mb-8 md:mb-20 text-xs leading-[1.5rem] md:text-lg'>How we help our users to get ensure the best data and provide the best service</p>
            
            <div className="flex items-center w-full"> 
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-6 pt-2 pb-10">
                    <InfoItem 
                    icon={<IoIosSearch/>}
                     title={'Guided Information'}
                      text={'Uncover city secrets with our expertly curated guided information. Navigate urban landscapes with insightful details, revealing the stories and history that define each city.'}
                    />

                    <InfoItem
                      icon={<GrMapLocation/>}
                      title={'Local Attractions'}
                     text={'Embark on a journey through local attractions that encapsulate the spirit of each city. From iconic landmarks to hidden gems, explore the unique charm and cultural richness that awaits.'}/>


                    <InfoItem 
                    icon={<IoCameraOutline/>}
                    title={'Captivating Images'}
                    text={'Indulge your senses with our gallery of captivating images. Immerse yourself in the visual tapestry of city life, featuring stunning photography that brings each destination to life'}
                    />
                </div>
      
            </div>

        </div>
        
    </section>

    <section className="min-h-[70px] bg-[#111]"></section>
    </>
  )
}

export default Info