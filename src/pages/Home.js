import { useEffect } from 'react';
import { Hero, FilterLocation, Cta } from '../components/Home';
import { Loading } from '../components';
import { useGlobalContext } from '../context';



const Home = () => {

      const {loading, fetchData} = useGlobalContext();


       useEffect(() => {
       window.scrollTo(0,0)
      }, [])


      useEffect(() => {
         fetchData({url: '/images/hero-bg.jpg', cityID: null});
      }, []);



   if(loading){
      return <Loading/>
   } else {
      return (
      <>
         <Hero/>
         <FilterLocation/>  
         <Cta/>
      </>
   ) 
   }
};

export default Home;
