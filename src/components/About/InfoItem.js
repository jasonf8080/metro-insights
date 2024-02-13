import React from 'react'

const InfoItem = ({icon, title, text}) => {
  return (
    <div className='min-w-full max-w-full flex flex-col justify-center items-center lg:p-10 text-center rounded-lg aspect-square'>
        <span className='text-7xl mb-6 md:mb-4'>{icon}</span>
        <h1 className='text-lg md:text-2xl mb-6'>{title}</h1>
        <p className='text-xs md:text-md leading-[2rem]'>{text}</p>
    </div>
  )
}

export default InfoItem