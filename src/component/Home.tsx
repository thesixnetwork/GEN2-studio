import React from 'react'
import logo1 from '../pic/Keplr_Icon 1.png'
import logo2 from '../pic/Copy.png'
import logo3 from '../pic/Share.png'
import logo4 from '../pic/SIX_Token_Icon 1.png'
import logo5 from '../pic/X.png'
import logo6 from '../pic/NFTBrowsItemFrame.png'
import logo7 from '../pic/Buakaw_Collection 1.png'
import logo8 from '../pic/Ethereum-icon-purple 1.png'
import logo9 from '../pic/SCR-25660710-nkmd 1.png'
import logo10 from '../pic/klaytn-klay-logo 1.png'
import Conectwalet from './Connectwallet'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className='w-full flex justify-center ' >
            <div className='w-full h-full fixed  flex justify-center items-center bg-gradient-24  from-white to-[#7A8ED7]'>
                <div className='w-[1280px] h-[832px] bg-gradient-24 to-gray-700 from-gray-300 rounded-2xl flex p-4  shadow-lg shadow-black/20 dark:shadow-black/40'>
                    <div className='h-full w-4/6 flex flex-col pl-[50px] pt-[50px]'>
                        <p className='text-[#FFFFFF] text-3xl mb-1'>Darf</p>
                        <div className='w-[891px] h-[1px] bg-[#D9D9D9]'></div>
                        <div className='flex mt-2'>
                            <Link to={`/newintregation/1`} className='w-[197px] h-[232px] mt-[30px] ml-3 border rounded-2xl flex justify-center items-center hover:scale-105 duration-500 cursor-pointer'>
                                <p className='text-white text-2xl hover:text-[#d2d3d7] duration-500 '>New Intregation</p>
                            </Link>
                        </div>
                        <p className='text-[#FFFFFF] text-3xl mt-[80px] mb-1 '>Live</p>
                        <div className='w-[891px] h-[1px] bg-[#D9D9D9]'></div>
                        <div className='mt-[30px] flex '>
                            <div className='flex flex-col justify-center items-center cursor-pointer'>
                                <div className=' flex  items-end hover:scale-105 duration-500 shadow-lg shadow-black/20 dark:shadow-black/40'>
                                    <img src={logo7} className='w-[197px] h-[232px] border-[#D9D9D9] border-[0.5px] rounded-2xl  '></img>
                                    <div className='w-[197px] h-[69px] bg-[#D9D9D9]/[0.8] rounded-b-2xl absolute flex flex-row justify-center items-center'>
                                        <img src={logo8} className='mr-2'></img>
                                        <p className='text-[#100072] text-[20px]  '>2000 Items</p>
                                    </div>
                                </div>
                                <p className='text-white text-2xl font-bold mt-3 hover:text-[#7A8ED7] duration-500 '>Buakaw1</p>
                            </div>

                            <div className='flex flex-col justify-center items-center ml-5 cursor-pointer'>
                                <div className=' flex  items-end hover:scale-105 duration-500 shadow-lg shadow-black/20 dark:shadow-black/40'>
                                    <img src={logo9} className='w-[197px] h-[232px] border-[#D9D9D9] border-[0.5px] rounded-2xl  '></img>
                                    <div className='w-[197px] h-[69px] bg-[#D9D9D9]/[0.8] rounded-b-2xl absolute flex flex-row justify-center items-center'>
                                        <img src={logo10} className='mr-2'></img>
                                        <p className='text-[#100072] text-[20px]  '>600 Items</p>
                                    </div>
                                </div>
                                <p className='text-white text-2xl font-bold mt-3  hover:text-[#7A8ED7] duration-500 '>Whale Gate Collection</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-2/6 h-full flex flex-col items-end  '>
                        <Conectwalet></Conectwalet>
                        <div className='w-[266px] h-[314px] border-[1px] border-white rounded-xl mt-[200px] flex flex-col items-center py-[15px]  '>
                            <p className='text-[24px] w-[231px] font-bold text-white'>Choose your collection</p>
                            <p className='text-[16px] w-[216px]  text-white pt-[20px]'>Create new integration, modify existing draft or manage collection which already in production.</p>
                        </div>

                    </div>

                </div>


            </div>

        </div>
    )
}

export default Home