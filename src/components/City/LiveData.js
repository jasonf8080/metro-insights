import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGlobalContext } from '../../context';
import axios from 'axios';

const LiveData = () => {

    const {id} = useParams();
    const {cities} = useGlobalContext();

    const [loading, setLoading] = useState(false)
    const [currentTime, setCurrentTime] = useState('')
    const [timeOfDay, setTimeOfDay] = useState('')
    const [currentTemp, setCurrentTemp] = useState('')


    const location = cities.find((city) => city.id === Number(id)).location

    const fetchTemp = async() => {
       const response = await axios.get('https://api.api-ninjas.com/v1/weather?city=' + location, {
        method: 'GET',
        headers: { 
            'X-Api-Key': 'Bp9hMVA1JhXsC4cs4px34g==ikOmUT4w135Pl6mV',
            'Content-Type': 'application/json'
        }
      });

        const celcius = response.data.temp;
        const farenheight = (celcius * 9/5) + 32;

        setCurrentTemp(Math.round(farenheight))

       

    }

    const fetchTime = async() => {
        const response = await axios.get('https://api.api-ninjas.com/v1/worldtime?city=' + location, {
        method: 'GET',
        headers: { 
            'X-Api-Key': 'Bp9hMVA1JhXsC4cs4px34g==ikOmUT4w135Pl6mV',
            'Content-Type': 'application/json'
        }
      });

      let fullTime = response.data.datetime.split(' ')[1];
      
    

   
    let [hours, minutes] = fullTime.split(':').map(Number);
   
    //First hour of the day (AM) returns as 00 hours
    if(hours === 0){
        hours = 12 
        setTimeOfDay('AM')
    } 

    //12:00 PM
    if(hours === 12){
        hours = 12
        setTimeOfDay('PM')
    }
    
    //Any time before 12:00PM (AM)
    if(hours < 12){
        hours = hours
        setTimeOfDay('AM')
    }
    
    //Any time after 12:00PM (PM)
    if(hours > 12){
        hours = hours - 12
        setTimeOfDay('PM')
    }  


    //Handle 0 in any single digit minutes (ex: 01)
    if(minutes < 10){
        minutes = `0${minutes}`
    } 

    const newTime = `${hours}:${minutes}`
    console.log(newTime)

    setCurrentTime(newTime)
 } 


    useEffect(() => {
      init();
    }, [])

    const init = async() =>{
        setLoading(true)
        await fetchTemp();
        await fetchTime();
        setLoading(false)
    }

  return (
    <section className='py-[140px] md:py-[180px]'>
        <div className='max-w-[80%] md:max-w-[60%] mx-auto flex flex-col md:flex-row justify-between items-center'>
            {loading ? <p>Loading...</p>
             : 
            <div className='text-center flex justify-center items-center flex-col'>
                <p className='text-2xl md:text-5xl mb-2 md:mb-3 flex items-center'><span>{currentTime}</span> <span className='text-xl md:text-[44px] ml-1 md:ml-3'>{timeOfDay}</span></p>
                <p className='text-xl md:text-2xl'>Time</p>
            </div>
            }

            <div className='mx-6 my-12 md:my-0 w-[40px] md:w-full h-1 md:h-2 bg-white rounded-md '></div>

             {loading ? <p>Loading...</p> 
             : 
            <div className='text-center flex justify-center items-center flex-col'>
                 <p className='text-2xl md:text-5xl mb-2 md:mb-3 flex items-center'><span>{currentTemp}</span> <span>&deg;</span>F</p>
                 <p className='text-xl md:text-2xl'>Degrees</p>
            </div>
            }
        </div>
    </section>
  )
}

export default LiveData