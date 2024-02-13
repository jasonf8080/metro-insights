import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Hero, Attractions, Gallery, LiveData, NextLocation } from '../components/City'
import { useGlobalContext } from '../context'
import { Loading } from '../components'


const City = () => {
    const {id} = useParams();
    const {fetchData, loading} = useGlobalContext();


    useEffect(() => {
      window.scrollTo(0,0)
    }, [id])


      useEffect(() => {
         fetchData({url: null, cityID: id});
      }, [id]);

  if(loading){
    return <Loading/>

  } else {
    return (
      <>
        <Hero/>
        <Attractions/>
        <Gallery/>
        <LiveData/>
        <NextLocation/>
      </>
    )
  }

}

export default City