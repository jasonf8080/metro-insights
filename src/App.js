import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, City, About } from './pages';
import { Navbar } from './components';
import Footer from './components/Footer';



function App() {

  
  
  return (
   <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/city/:id' element={<City/>}></Route>
          <Route path='/about' element={<About/>}></Route>
      
        </Routes>
        <Footer/>
 
   </BrowserRouter>
  );
}

export default App;
