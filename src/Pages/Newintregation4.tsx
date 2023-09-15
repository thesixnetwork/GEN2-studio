import React from 'react'
import Conectwalet from '../component/Connectwallet'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import GobackButton from '../component/GobackButton';
import NextPageButton from '../component/NextPageButton';

const NewIntregation4 = () => {

    return (
        <div className='w-full flex justify-center ' >
            <div className='w-full h-full fixed  flex justify-center items-center bg-gradient-24  from-white to-[#7A8ED7]'>
                <div className='w-[1280px] h-[832px] bg-gradient-24 to-gray-700 from-gray-300 rounded-2xl flex p-4  shadow-lg shadow-black/20 dark:shadow-black/40 justify-between'>
                <div className=' absolute scale-50'>
                        <GobackButton BackPage='/newintregation/3'></GobackButton>
                    </div>
                    <div className='w-full flex flex-col justify-between items-center py-[130px]'>
                        <h1 className='text-[78px]'>creating a schema</h1>
                        <div className='w-[814px] h-[201px] border-[1px] border-white rounded-xl  flex flex-col justify-between items-center px-[25px] py-[10px]'>
                            <ArrowDropDownIcon sx={{ fontSize: 40 }} className='ml-[-650px]' ></ArrowDropDownIcon>
                            <div className='flex justify-between w-full'>
                                <div className='flex flex-col  items-center w-1/6'>
                                    <p className='text-[48px]'>0</p>
                                    <p className='text-center'>start here</p>
                                </div>
                                <div className='flex flex-col  items-center w-1/6'>
                                    <p className='text-[48px]'>1</p>
                                    <p className='text-center'>basic data</p>
                                </div>
                                <div className='flex flex-col  items-center w-1/6'>
                                    <p className='text-[48px]'>2</p>
                                    <p className='text-center'>origin collection data</p>
                                </div>
                                <div className='flex flex-col  items-center w-1/6'>
                                    <p className='text-[48px]'>3</p>
                                    <p className='text-center'>origin token attributes</p>
                                </div>
                                <div className='flex flex-col  items-center w-1/6'>
                                    <p className='text-[48px]'>4</p>
                                    <p className='text-center'>onchain collection attributes</p>
                                </div>
                                <div className='flex flex-col  items-center w-1/6'>
                                    <p className='text-[48px]'>5</p>
                                    <p className='text-center'>on-chain token attributes</p>
                                </div>
                                <div className='flex flex-col  items-center w-1/6'>
                                    <p className='text-[48px]'>6</p>
                                    <p className='text-center'>actions</p>
                                </div>

                            </div>
                        </div>
                        <NextPageButton TextTitle='START' BorderRadius={0} NextPage='/newintregation/5'  FontSize={60} ></NextPageButton>
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

export default NewIntregation4