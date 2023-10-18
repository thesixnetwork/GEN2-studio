import React from 'react'
import Conectwalet from '../component/Connectwallet'
import logo1 from "../pic/Vector.png"
import Goblackbutton from '../pic/Back.png'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import GobackButton from '../component/GobackButton'
import WhiteBox from '../component/WhiteBox'
import NextPageButton from '../component/NextPageButton'

const NewIntregation2 = () => {
    return (
        <div className='w-full flex justify-center ' >
            <div className='w-full h-full fixed  flex justify-center items-center bg-gradient-24  from-white to-[#7A8ED7]'>
                <div className='w-[1280px] h-[832px] bg-gradient-24 to-gray-700 from-gray-300 rounded-2xl flex justify-between p-4 shadow-lg shadow-black/20 dark:shadow-black/40 '>
                    <div className='flex flex-col w-full justify-center items-center relative'>
                        <div className='flex justify-center items-center'>
                            <div className='w-[144px] h-[144px] border-[1px] border-white rounded-full flex justify-center items-center text-white text-[64px]'>NFT</div>
                            <p className='text-white text-[64px] ml-10'> +</p>
                            <p className='text-white text-[64px] ml-10'>Gen2</p>
                            <p className='text-white text-[64px] ml-10'>=</p>
                            <div className='w-[144px] h-[144px] border-[1px] border-white rounded-full flex justify-center items-center text-white text-[64px] ml-10'>NFT
                                <img src={logo1} className='absolute mt-[145px] mr-[8px] scale-50'></img>
                                <img src={logo1} className='absolute mt-[120px] ml-[75px] scale-90'></img>
                                <img src={logo1} className='absolute mt-[120px] mr-[80px] scale-75'></img>
                            </div>
                        </div>
                        <div className='w-[770px]  border-[1px] border-white rounded-xl mt-[100px] flex flex-col  items-center  p-[20px] text-white mb-[40px]  '>
                            <p className='font-light text-[18px]'><span className=' font-bold text-[21px]'>Data Layer - NFT Gen 2</span> is designed to empower existing NFTs for various business applications. Its dynamic attributes can be modified on the blockchain with permission, bridging real-world businesses and blockchain technology. It allows for the creation of NFTs that can serve as membership cards, event tickets, health tags for hospitality, and much more. If you want to explore further, please visit NFT Gen 2 for additional information.</p>
                        </div>
                        <div className=' absolute bottom-0 left-0'>
                            <GobackButton BackPage='/newintregation/1'></GobackButton>
                        </div>
                    </div>
                    <div className='flex items-center flex-col relative'>
                        <div className='w-full flex justify-end'>
                            <Conectwalet></Conectwalet>
                        </div>
                        <div className='mt-[40%]'>
                            <WhiteBox
                                TitleSize={18}
                                Title={'About Data Layer - NFT Gen 2'}
                                DetailSize={15}
                                DeTail={'Briefly explain about NFT Gen 2, first data layer in SIX Protocol'}
                                Height={300}
                                Width={266}
                            >
                            </WhiteBox>
                        </div>
                        <div className='absolute bottom-0 right-[20%]'>
                            <NextPageButton TextTitle='NEXT' NextPage='/newintregation/3' FontSize={45} BorderRadius={0}  ></NextPageButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewIntregation2