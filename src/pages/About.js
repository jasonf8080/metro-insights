import React, { useEffect } from 'react'
import { Hero, Info } from '../components/About'
import { useGlobalContext } from '../context'
import { Loading } from '../components'
const About = () => {
  const {loading, fetchData} = useGlobalContext();
  
  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

  useEffect(() => {
    fetchData({url: '/images/about1.jpg', cityID: null})
  }, [])

  if(loading){
    return <Loading/>
  } else {

  return (
   <>
    <Hero/>
    <Info/>
   </>
  )
  }
}

export default About