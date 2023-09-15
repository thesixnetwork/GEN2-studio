import React from 'react'
import Conectwalet from '../component/Connectwallet'
import logo1 from "../pic/Vector 4.png"
import { Link } from 'react-router-dom'
import GobackButton from '../component/GobackButton'
import NextPageButton from '../component/NextPageButton'
import { Tooltip } from '@mui/material'
import Help from '../component/Alert/Help'

const NewIntregation3 = () => {
    const [isShow, setIsShow] = React.useState(true);
    return (
        <div className='w-full flex justify-center ' >
            <div className='w-full h-full fixed  flex justify-center  items-center bg-gradient-24  from-white to-[#7A8ED7]'>
                <div className='w-[1280px] h-[832px] bg-gradient-24 to-gray-700 from-gray-300 rounded-2xl flex flex-col  items-center  p-4 shadow-lg shadow-black/20 dark:shadow-black/40'>
                    <div className='flex justify-between w-full'>
                        <h1 className='text-white text-[78px] ml-[100px] '>Before we go</h1>
                        <Conectwalet ></Conectwalet>
                    </div>
                    <div className='w-[80%] h-full flex justify-between  pt-[200px]   '>
                        <div className='w-[230px] h-[166px] border-[1px] border-white rounded-xl p-2 flex flex-col items-center  '>
                            <p className='font-bold text-xl text-white'>This is information</p>
                            <p className='text-white mt-6'>This is the content of the information</p>
                            {isShow &&
                                <div>
                                    <img src={logo1} className='mt-[80px] mr-[150px]'></img>
                                    <p className='ml-[80px]'>This is info box</p>
                                </div>
                            }
                        </div>
                        <div className='w-[658px] h-[121px] border-[1px] border-white rounded-xl p-2 flex  items-center justify-center  '>
                            <p className='font-bold text-[24px] mr-10'>Field Title / Label</p>
                            <input type="text" placeholder="textfield input" className='bg-transparent text-[24px] border-[1px] border-[#D9D9D9DD] border-dashed p-1 z-50 focus:outline-none focus:scale-105 duration-1000  '></input>
                            <div className='w-[15px] h-[15px] bg-[#D9D9D9] rounded-full absolute ml-[630px] mb-[90px]'></div>
                            {isShow &&
                                <div className='absolute mt-[300px]'>
                                    <div className='mt-[210px] ml-[-200px] absolute'>
                                        <NextPageButton TextTitle='GO FOR IT' NextPage='/newintregation/4' FontSize={50} BorderRadius={0}  ></NextPageButton>
                                    </div>
                                    <img src={logo1} className='mt-[280px] mr-[150px] -rotate-[75deg] '></img>
                                    <p className='ml-[160px] mt-[-95px] absolute '>This is button</p>
                                </div>
                            }
                            {isShow &&
                                <div className='absolute mt-[120px] ml-[500px]'>
                                    <img src={logo1} className='mt-[80px] mr-[150px] -rotate-45'></img>
                                    <p className='ml-[150px] mt-[-50px] absolute'>This is input</p>
                                </div>
                            }
                            {isShow &&
                                <div className='absolute mt-[-400px]'>
                                    <img src={logo1} className='mt-[155px] ml-[540px] rotate-[140deg] z-[-10]'></img>
                                    <div className='ml-[400px] mt-[-170px] absolute grid grid-cols-2 gap-x-0  justify-center items-center'>
                                        <div className='w-[15px] h-[15px] bg-[#D9D9D9] rounded-full '></div>
                                        <p className='ml-[-20px]'>Required</p>
                                        <div className='w-[15px] h-[15px] bg-transparent border border-[#D9D9D9]  rounded-full'></div>
                                        <p className='ml-[-20px]'>Optional</p>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div className='flex justify-between items-center w-full px-2'>
                        <div className='scale-50'>
                            <GobackButton BackPage='/newintregation/2' ></GobackButton>
                        </div>
                        <div onClick={() => { setIsShow(!isShow) }} >
                            <Help ></Help>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewIntregation3