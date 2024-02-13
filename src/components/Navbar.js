import { AnimatePresence, motion} from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import { Link } from 'react-router-dom';
import { HiBars3CenterLeft } from "react-icons/hi2";
import { IoHomeOutline } from "react-icons/io5";
import { GoInfo } from "react-icons/go";
import { useGlobalContext } from '../context';



const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false)
  const [toggleSearch, setToggleSearch] = useState(false)
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([])

  const {loading, cities} = useGlobalContext();

  //Toggle and Hide Menu/Search
  const handleMenuToggle = () => {
    if(!toggleMenu){
      hideSearch()
      setSearchValue('')
    }

    setToggleMenu(!toggleMenu)

  }


  const handleSearchToggle = () => {
    if(toggleSearch){
      setSearchValue('')
    }
    hideMenu();
    setToggleSearch(!toggleSearch)
  }


  const hideMenu = () => {
    setToggleMenu(false)
  }

  const hideSearch = () => {
    setToggleSearch(false)
  }

//Return all items that match input
  useEffect(() => {
     const filteredResults = cities.filter((item) => {
      if(searchValue !== '' && item.location.startsWith(searchValue.toLowerCase())){
        return item
      }  
    })

    setSearchResults(filteredResults)
}, [searchValue])


  return (
    <nav className={`${loading && 'hidden'} w-full h-[10vh] absolute bg-transparent top-0 left-0 z-[999] flex items-center`}>
      
        <div className="container py-10 flex justify-between items-center">
            <div className='cursor-pointer relative'>
              <button onClick={handleMenuToggle} className='text-3xl md:text-4xl'><HiBars3CenterLeft/></button>

            <AnimatePresence mode='wait'>
              {toggleMenu && 
              <motion.div
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
                exit={{opacity: 0}}
               className="absolute top-[100%] left-0  border-2 border-white bg-black bg-opacity-90 md:bg-opacity-70 px-6 py-2 rounded-lg mt-[10px]">
                <Link to='/' className='flex items-center my-3' onClick={hideMenu}>
                  <span className='text-md md:text-xl mr-3 translate-y-[-3px]'><IoHomeOutline/></span>
                  <p className='text-sm md:text-lg'>Home</p>
                </Link>

                  <Link to='/about' className='flex items-center my-3' onClick={hideMenu}>
                  <span className='text-md md:text-xl mr-3 translate-y-[-2px]'><GoInfo/></span>
                  <p className='text-sm md:text-lg'>About</p>
                </Link>
              </motion.div>
              }
              </AnimatePresence>

            </div>
            

            {/* SEARCH BAR CONTAINER */}
            <div className={'relative flex'}>
              <AnimatePresence>
              {toggleSearch && 
              <motion.div className='translate-y-[-8px] md:translate-y-0 border-b-2 border-white'
              initial={{width: 0, opacity: 0}}
              animate={{width: 200, opacity: 1}}
              transition={{duration: 1}}
               exit={{ opacity: 0, width: 100 }}>
                  <input type="text" 
                    placeholder='Search for a city'
                   className='bg-transparent text-xs md:text-lg w-full uppercase min-h-full px-0 py-2 outline-none border-none text-white'
                   value={searchValue} onChange={(e) => setSearchValue(e.target.value)} 
                 />

              </motion.div>}
              </AnimatePresence>


              <button className='transparent z-[999] w-[60px] min-h-full flex justify-center items-center cursor-pointer outline-none'
               onClick={handleSearchToggle}>
                  <IoIosSearch className='text-[1.6rem] md:text-3xl translate-y-[-6px] md:translate-y-0'/>
              </button>


              {/* SEARCH RESULTS */}
              <AnimatePresence mode='wait'>
             {searchValue && searchResults.length > 0 && 
             <motion.div
             initial={{opacity: 0, y: -20}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.25}}
            
              className="absolute min-w-[95%] max-w-[100%] top-[100%] mt-3 md:mt-6 left-0 bg-black bg-opacity-90 md:bg-opacity-70 px-6 py-2 z-[999] border-white border-2 rounded-lg">
                {searchValue && searchResults.length > 0 && searchResults.map((item) => {
                    const {id, location} = item
                    return <Link to={`/city/${id}`}><p className='text-xs md:text-lg my-3 cursor-pointer w-full' onClick={handleSearchToggle}>{location}</p></Link>
                  })
                }
              </motion.div>}
              </AnimatePresence>
            </div>
        </div>
    </nav>
  )
}

export default Navbar