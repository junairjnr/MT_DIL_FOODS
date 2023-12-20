import React from 'react';
import Delivery from '../img/delivery.png';
import HeroBg from '../img/heroBg.png';
import { heroData } from '../utils/data';


const HomeContainer = () => {
    return (
        <section className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full h-screen' id='home'>
            <div className='py-2 flex-1 flex flex-col items-start justify-center gap-6'>
                <div className='flex items-center gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full'>
                    <p className='text-base text-orange-500 font-semibold'>Bike Delivery</p>
                    <div className='w-8 h-8 bg-white rounded-full over overflow-hidden drop-shadow-xl'>
                        <img src={Delivery}
                            className="w-full h-full object-contain" alt="Delivery" />
                    </div>
                </div>
                <p className="text-[2.5rem] md:text-[4.5rem] font-extrabold tracking-wide text-headingColor">
                    The Fastest Delivery in <span className=' text-orange-700 text- [3.5-rem] md:text-[5rem]'>Your City</span>
                </p>

                <p className='text-base text-textColor text-center md:text-left md:w-[80%]'>
                    Lorem ipsum dolor sit amet consecteturadipisicing elit
                    Dignissimos laboriosam commodi, ab, sit impedit officiis dolorum
                    minima quia voluptas accusantium vel totam quod.
                    Praesentium nesciunt expedita unde quo voluptatem nihil!</p>

                <button onClick={() => {
                    console.log("Order now Clicked");
                }} type='button'
                    className='bg-gradient-to-br from-orange-400 to-orange-500 first-letter:2.5rem
                         w-full md:w-auto p-2 px-4 py-2 rounded-lg hover: shadow-lg transition-all ease-in-out duration-100'>
                    ORDER NOW</button>
            </div>
            <div className='py-2 flex-1 flex justify-center relative'>
                <img src={HeroBg} alt="hero bg" className='ml-auto h-420 w-full lg:w-auto lg:h-650  ' />
                <div className='w-full h-full  absolute top-0 left-0 flex items-center justify-center lg:px-32 py-4 gap-4 flex-wrap'>
                    {heroData && heroData.map(n => (
                        <div key={n.id} className='lg:w-190 p-4 bg-cardOverlay backdrop-blur-md rounded-3xl
                         flex flex-col items-center justify-center'>
                            <img src={n.imageSrc} alt="I1" className='w-20 lg:w-40 -mt-10 lg:-mt-20' />
                            <p className='text-base lg:text-xl font-semibold text-textColor m-2 lg:mt-4'>{n.name}</p>
                            <p className='text-[12px] lg:text-sm text-lighttextGray font-semibold my-1 lg:my-3'>{n.description}</p>
                            <p className='text-sm text-headingColor font-semibold '>
                                <span className='text-xs text-red-600'>$</span>{n.price}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    )
}

export default HomeContainer
