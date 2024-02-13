import React, { createContext, useState, useContext } from 'react';

const MyContext = createContext();

// Create a provider component
const ContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const [image, setImage] = useState('')
  const [cities, setCities] = useState([]);


    const fetchData = async ({url, cityID}) => {
         setLoading(true)

         try {
            const response = await fetch('/data.json');
            const data = await response.json();

            setCities(data)

            const img = new Image(); 
            if(url){
              img.src = url
            } else {
              img.src = `/images/${data[cityID].location.replace(/\s/g, '')}.jpg`; 
            }
            

            img.onload = () => { 
               setImage(img.src)
               setLoading(false)
            }; 
         
            } catch (error) {
               console.log(error);
            }
    };

    
    
      
  return (
    <MyContext.Provider value={{
       loading, setLoading,
       fetchData,
       image,
       cities
       }}>
      {children}
    </MyContext.Provider>
  );
};



// Create a custom hook for using the context
const useGlobalContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
};

export { ContextProvider, useGlobalContext };
