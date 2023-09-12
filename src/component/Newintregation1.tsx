import React from 'react'
import Conectwalet from './Connectwallet'
import { Link } from 'react-router-dom'

const NewIntregation1 = () => {
    return (
        <div className='w-full flex justify-center ' >
            <div className='w-full h-full fixed  flex justify-center items-center bg-gradient-24  from-white to-[#7A8ED7]'>
                <div className='w-[1280px] h-[832px] bg-gradient-24 to-gray-700 from-gray-300 rounded-2xl flex justify-between p-4 shadow-lg shadow-black/20 dark:shadow-black/40'>
                    <div className='flex flex-col justify-center items-center  w-full'>
                        <Link to={`/newintregation/2`}  className='w-[751px] h-[187px] border rounded-full flex flex-col justify-center items-center mb-5 cursor-pointer hover:scale-105 duration-500'>
                            <h1 className='font-bold text-2xl text-white '>Beginer</h1>
                            <p className='w-[580px] text-white'>At the beginner level, users have little to no programming experience. They are eager to learn and understand the basics of programming. The user interface will be designed to provide simple navigation, clear instructions, and visual aids to support their learning process.</p>
                        </Link>
                        <Link to={`/newintregation/2`}  className='w-[751px] h-[187px] border rounded-full flex flex-col justify-center items-center mb-5 cursor-pointer hover:scale-105 duration-500'>
                            <h1 className='font-bold text-2xl text-white '>Intermediate</h1>
                            <p className='w-[580px] text-white'>At the intermediate level, users have some programming experience and understanding of core concepts. The user interface will provide advanced features and resources to support their continued growth and development</p>
                        </Link>
                        <Link to={`/newintregation/2`}  className='w-[751px] h-[187px] border rounded-full flex flex-col justify-center items-center cursor-pointer hover:scale-105 duration-500'>
                            <h1 className='font-bold text-2xl text-white '>For Developer</h1>
                            <p className='w-[580px] text-white'>For developers, the user interface will offer advanced tools and features that cater to their extensive programming experience and expertise.</p>
                        </Link>
                    </div>
                    <div>
                        <Conectwalet></Conectwalet>
                        <div className='w-[266px] h-[414px] border-[1px] border-white rounded-xl mt-[100px] flex flex-col items-center p-[10px]  '>
                            <p className='text-[20px] w-[231px] font-bold text-white'>What is your level of programming experience?</p>
                            <p className='text-[16px] w-[216px]  text-white pt-[20px]'>The user interface of the page will be tailored to your programming experience. Based on your selection, whether you are a beginner, intermediate, or a developer, we will customize the interface to provide you with the most suitable tools and features that align with your level of experience.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewIntregation1