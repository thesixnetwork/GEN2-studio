import React from 'react'
import Conectwalet from './Connectwallet'
import logo1 from "../pic/Vector.png"
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
const NewIntregation2 = () => {
    return (
        <div className='w-full flex justify-center ' >
            <div className='w-full h-full fixed  flex justify-center items-center bg-gradient-24  from-white to-[#7A8ED7]'>
                <div className='w-[1280px] h-[832px] bg-gradient-24 to-gray-700 from-gray-300 rounded-2xl flex justify-between p-4 shadow-lg shadow-black/20 dark:shadow-black/40'>
                    <div className='flex flex-col w-full justify-center items-center'>
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

                        <div className='w-[770px] h-[223px] border-[1px] border-white rounded-xl mt-[100px] flex flex-col justify-center items-center p-[10px] text-white mb-[40px] '>
                            <p>Data Layer - NFT Gen 2 is designed to empower existing NFTs for various business applications. Its dynamic attributes can be modified on the blockchain with permission, bridging real-world businesses and blockchain technology. It allows for the creation of NFTs that can serve as membership cards, event tickets, health tags for hospitality, and much more. If you want to explore further, please visit NFT Gen 2 for additional information.</p>
                        </div>

                    </div>
                    <div className='flex justify-between items-center flex-col'>
                        <Conectwalet></Conectwalet>
                        <div className='w-[266px] h-[284px] border-[1px] border-white rounded-xl  flex flex-col items-center p-[10px]  '>
                            <p className='text-[20px] w-[231px] font-bold text-white'>About  Data Layer - NFT Gen 2</p>
                            <p className='text-[16px] w-[216px]  text-white pt-[20px]'>Briefly explain about NFT Gen 2, first data layer in SIX Protocol</p>
                        </div>
                        <Link  to={`/newintregation/3`}>
                            <Button variant="outlined"
                                style={{
                                    borderRadius: 80,
                                    color: 'white',
                                    borderColor: 'white',
                                    padding: "18px 36px",
                                    fontSize: "38px",
                                }}>NEXT</Button>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewIntregation2