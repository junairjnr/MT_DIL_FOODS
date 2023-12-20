import React, { useEffect } from 'react'
import { AnimatePresence } from "framer-motion"
import { Route, Routes } from 'react-router-dom'
import { Header, MainContainer, CreateContainer, ContactForm } from './Components'
import { useStateValue } from './Context/stateProvider'
import { GetAllFoodItems } from './utils/FirebaseFunctions'
import { actionType } from './Context/reducer'


const App = () => {

  const [{}, dispatch] = useStateValue();

  const fetchData = async () =>{
    await GetAllFoodItems().then((data) =>{
      // console.log(data); 
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data
      });
    });
  };

  useEffect(() =>{
    fetchData();
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      <div className='w-screen h-auto flex flex-col bg-primary'>
        <Header />

        <main className='mt-14 md:mt-20 px-16 py-4 w-full'>
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
            <Route path="/contactForm" element={<ContactForm />} />
          </Routes>
        </main>
      </div>

    </AnimatePresence>


  )
}

export default App
