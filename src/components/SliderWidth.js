import React from 'react'

const SliderWidth = ({sliderPosition}) => {
  return (
    <div className="w-[100%] mx-auto rounded-md relative h-2 md:h-3 bg-black z-[999]">
        <div style={{width: `${sliderPosition}%`}} className="absolute top-0 left-0 bg-white w-[50%] h-2 md:h-3 rounded-md"></div>
    </div>
  )
}

export default SliderWidth