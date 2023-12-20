import React, { useState } from 'react'
import { MdShoppingBasket, MdAdd, MdLogout } from 'react-icons/md';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config"

import Logo from '../img/logo.png'
import Avatar from '../img/avatar.png'
import { async } from '@firebase/util';
import { useStateValue } from '../Context/stateProvider';
import { actionType } from '../Context/reducer';



const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user }, dispatch] = useStateValue()

  const [isMenu, setIsMenu] = useState(false)


  const login = async () => {

    if (!user) {
      const { user: { refreshToken, providerData } } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0]
      });
      localStorage.setItem('user', JSON.stringify(providerData[0]))
    } else {
      setIsMenu(!isMenu)
    }

  }
  const logout = () => {
    setIsMenu(false);
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,

    });
  };



  return (
    <header className=' fixed z-50 w-screen  p-3 px-8 md:p-6 md:px-16 bg-primary'>
      {/* for Desktop & tablet*/}
      <div className='hidden md:flex h-full w-full items-center justify-between '>
        <Link to={"/"} className="flex items-end gap-2">
          <img src={Logo} className="w-8 object-cover cursor-pointer" alt="logo" />
          <p className="text-headingColor text-xl font-bold cursor-pointer">City</p>
        </Link>
        <div className='flex items-center gap-8'>
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className='flex items-center gap-8  '>
            <li className='text-base text-textColor hover:text-headingColor duration-100
         transition-all ease-in-out cursor-pointer'
              onClick={() => {
                setIsMenu(false)
              }}
            >Home</li>
            <li className='text-base text-textColor hover:text-headingColor duration-100
         transition-all ease-in-out cursor-pointer'
              onClick={() => {
                setIsMenu(false)
              }}
            >Menu</li>
            <li className='text-base text-textColor hover:text-headingColor duration-100
         transition-all ease-in-out cursor-pointer'
              onClick={() => {
                setIsMenu(false)
              }}
            >About Us</li>
            <li className='text-base text-textColor hover:text-headingColor duration-100
         transition-all ease-in-out cursor-pointer'
              onClick={() => {
                setIsMenu(false)
              }}
            >Services</li>
          </motion.ul>
          <div className="relative flex items-center justify-center mr-3">
            <MdShoppingBasket onClick={() => {
              console.log("cart clicked");
            }} className='text-textColor text-2xl  cursor-pointer ' />
            <div className="absolute -top-1 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex
         items-center justify-center">
              <p className='text-xs text-white font-semibold'>2</p>
            </div>
          </div>

          {/* here is the avatar area */}
          <div className="relative">
            <motion.img whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar} className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer"
              alt="UserProfile"
              onClick={login} />
            {
              isMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  className='w-40 bg-grey-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0'>
                  {
                    user && user.email === "junairjunu869@gmail.com" && (
                      <Link to={'/createItem'}>
                        <p onClick={() => {
                          setIsMenu(false)
                          console.log("Add A Item");
                        }} className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 
            transition-all duration-100 ease-in-out text-textColor text-base'>New Item <MdAdd /></p>
                      </Link>
                    )
                  }

                  <p
                    className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 
            transition-all duration-100 ease-in-out text-textColor text-base'
                    onClick={logout} >LogOut <MdLogout /></p>
                </motion.div>
              )
            }
          </div>
        </div>
      </div>
      {/* -------------------------------------------------------------------------------------------------- */}
      {/*for mobile */}
      <div className='flex md:hidden items-center justify-between h-full w-full'>

        {/* cart---------------------------------- */}
        <div className="relative flex items-center justify-center mr-3">
          <MdShoppingBasket onClick={() => {
            console.log("cart clicked");
          }} className='text-textColor text-2xl  cursor-pointer ' />
          <div className="absolute -top-1 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex
         items-center justify-center">
            <p className='text-xs text-white font-semibold'>2</p>
          </div>
        </div>

        {/* img---------- */}
        <Link to={"/"} className="flex items-end gap-2">
          <img src={Logo} className="w-8 object-cover cursor-pointer" alt="logo" />
          <p className="text-headingColor text-xl font-bold cursor-pointer">City</p>
        </Link>


        {/* here is the avatar area -----------*/}
        <div className="relative">
          <motion.img whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar} className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer"
            alt="UserProfile"
            onClick={login} />
          {
            isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className='w-40 bg-grey-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0'>
                {
                  user && user.email === "junairjunu869@gmail.com" && (
                    <Link to={'/createItem'}>
                      <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 
            transition-all duration-100 ease-in-out text-textColor text-base bg-orange-50'
                        onClick={() => setIsMenu(false)}
                      >New Item <MdAdd /></p>
                    </Link>
                  )
                }
                <ul className='flex flex-col px-4 py-2  gap-4 bg-orange-50 '>
                  <li className='text-base text-textColor hover:text-headingColor duration-100
         transition-all ease-in-out cursor-pointer hover:bg-slate-300 px-4 py-2'
                    onClick={() => setIsMenu(false)}
                  >Home</li>
                  <li className='text-base text-textColor hover:text-headingColor duration-100
         transition-all ease-in-out cursor-pointer hover:bg-slate-300 px-4 py-2'
                    onClick={() => setIsMenu(false)}
                  >Menu</li>
                  <li className='text-base text-textColor hover:text-headingColor duration-100
         transition-all ease-in-out cursor-pointer hover:bg-slate-300 px-4 py-2'
                    onClick={() => setIsMenu(false)}
                  >About Us</li>
                  <li className='text-base text-textColor hover:text-headingColor duration-100
         transition-all ease-in-out cursor-pointer hover:bg-slate-300 px-4 py-2'
                    onClick={() => setIsMenu(false)}
                  >Services</li>
                </ul>
                <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 
            transition-all duration-100 ease-in-out text-textColor text-base bg-orange-50 '

                  onClick={logout}>LogOut <MdLogout /></p>
              </motion.div>
            )
          }
        </div>
      </div>
    </header>
  )
}

export default Header
