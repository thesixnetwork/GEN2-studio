import React from 'react'
import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import logo1 from '../pic/trash-bin_5028066 1.png'
import logo2 from "../pic/Vector 4.png"
import logo3 from '../pic/Vector 7.png'

import Conectwalet from './Connectwallet'
import Stepper2 from './Stepper2';
import Darkbg from './Alert/Darkbg';
import AlertCard from './Alert/AlertCard';

const NewIntregation7 = () => {
    const [isShow, setIsShow] = React.useState(false);
    return (
        <div className='w-full flex justify-center ' >
            <div className='w-full h-full fixed  flex justify-center items-center bg-gradient-24  from-white to-[#7A8ED7]'>
                <div className='w-[1280px] h-[832px] bg-gradient-24 to-gray-700 from-gray-300 rounded-2xl flex justify-between p-4 shadow-lg shadow-black/20 dark:shadow-black/40'>
                    <div className='w-full h-full px-[20px]'>
                        <div>
                            <Stepper2 ActiveStep={3}></Stepper2>
                            <div className='w-[931px] h-[1px] bg-[#D9D9D9]'></div>
                        </div>
                        <div className='mt-7 ml-10 w-full h-5/6 grid-cols-3 grid justify-center items-center '>
                            <div className='w-[227px] h-[157px] bg-[#40547A] rounded-xl p-3 '>
                                <div className='w-[24px] h-[24px] bg-red-500 flex justify-center items-center rounded-full absolute ml-[185px] mt-[-7px]'>
                                    <DeleteIcon className='scale-75'></DeleteIcon>
                                </div>
                                <div className='flex text-[14px] mt-2'>Name :&ensp;<p className='underline'>background</p></div>
                                <div className='flex text-[14px]'>Data type :&ensp;<p className='underline'>string</p></div>
                                <div className='flex text-[14px]'>Display value field :&ensp;<p className='underline'>value</p></div>
                                <div className='flex text-[14px]'>Display option :&ensp;<p className='underline'>opensea</p></div>
                                <div className='flex text-[14px]'>Trait type :&ensp;<p className='underline'>Background</p></div>
                            </div>
                            <div className='w-[227px] h-[157px] bg-[#40547A] rounded-xl p-3 '>
                                <div className='w-[24px] h-[24px] bg-red-500 flex justify-center items-center rounded-full absolute ml-[185px] mt-[-7px]'>
                                    <DeleteIcon className='scale-75'></DeleteIcon>
                                </div>
                                <div className='flex text-[14px] mt-2'>Name :&ensp;<p className='underline'>background</p></div>
                                <div className='flex text-[14px]'>Data type :&ensp;<p className='underline'>string</p></div>
                                <div className='flex text-[14px]'>Display value field :&ensp;<p className='underline'>value</p></div>
                                <div className='flex text-[14px]'>Display option :&ensp;<p className='underline'>opensea</p></div>
                                <div className='flex text-[14px]'>Trait type :&ensp;<p className='underline'>Background</p></div>
                            </div>
                            <div className='w-[227px] h-[157px] bg-[#40547A] rounded-xl p-3 '>
                                <div className='w-[24px] h-[24px] bg-red-500 flex justify-center items-center rounded-full absolute ml-[185px] mt-[-7px]'>
                                    <DeleteIcon className='scale-75'></DeleteIcon>
                                </div>
                                <div className='flex text-[14px] mt-2'>Name :&ensp;<p className='underline'>background</p></div>
                                <div className='flex text-[14px]'>Data type :&ensp;<p className='underline'>string</p></div>
                                <div className='flex text-[14px]'>Display value field :&ensp;<p className='underline'>value</p></div>
                                <div className='flex text-[14px]'>Display option :&ensp;<p className='underline'>opensea</p></div>
                                <div className='flex text-[14px]'>Trait type :&ensp;<p className='underline'>Background</p></div>
                            </div>
                            <div className='w-[227px] h-[157px] bg-[#40547A] rounded-xl p-3 '>
                                <div className='w-[24px] h-[24px] bg-red-500 flex justify-center items-center rounded-full absolute ml-[185px] mt-[-7px]'>
                                    <DeleteIcon className='scale-75'></DeleteIcon>
                                </div>
                                <div className='flex text-[14px] mt-2'>Name :&ensp;<p className='underline'>background</p></div>
                                <div className='flex text-[14px]'>Data type :&ensp;<p className='underline'>string</p></div>
                                <div className='flex text-[14px]'>Display value field :&ensp;<p className='underline'>value</p></div>
                                <div className='flex text-[14px]'>Display option :&ensp;<p className='underline'>opensea</p></div>
                                <div className='flex text-[14px]'>Trait type :&ensp;<p className='underline'>Background</p></div>
                            </div>
                            <div className='w-[227px] h-[157px] bg-[#40547A] rounded-xl p-3 '>
                                <div className='w-[24px] h-[24px] bg-red-500 flex justify-center items-center rounded-full absolute ml-[185px] mt-[-7px]'>
                                    <DeleteIcon className='scale-75'></DeleteIcon>
                                </div>
                                <div className='flex text-[14px] mt-2'>Name :&ensp;<p className='underline'>background</p></div>
                                <div className='flex text-[14px]'>Data type :&ensp;<p className='underline'>string</p></div>
                                <div className='flex text-[14px]'>Display value field :&ensp;<p className='underline'>value</p></div>
                                <div className='flex text-[14px]'>Display option :&ensp;<p className='underline'>opensea</p></div>
                                <div className='flex text-[14px]'>Trait type :&ensp;<p className='underline'>Background</p></div>
                            </div>
                            <div className='w-[227px] h-[157px] bg-[#40547A] rounded-xl p-3 '>
                                <div className='w-[24px] h-[24px] bg-red-500 flex justify-center items-center rounded-full absolute ml-[185px] mt-[-7px]'>
                                    <DeleteIcon className='scale-75'></DeleteIcon>
                                </div>
                                <div className='flex text-[14px] mt-2'>Name :&ensp;<p className='underline'>background</p></div>
                                <div className='flex text-[14px]'>Data type :&ensp;<p className='underline'>string</p></div>
                                <div className='flex text-[14px]'>Display value field :&ensp;<p className='underline'>value</p></div>
                                <div className='flex text-[14px]'>Display option :&ensp;<p className='underline'>opensea</p></div>
                                <div className='flex text-[14px]'>Trait type :&ensp;<p className='underline'>Background</p></div>
                            </div>
                            <div className='w-[227px] h-[157px] bg-[#40547A] rounded-xl p-3 z-10 '>
                                <div className='w-[24px] h-[24px] bg-red-500 flex justify-center items-center rounded-full absolute ml-[185px] mt-[-7px]'>
                                    <DeleteIcon className='scale-75'></DeleteIcon>
                                </div>
                                <div className='flex text-[14px] mt-2'>Name :&ensp;<p className='underline'>background</p></div>
                                <div className='flex text-[14px]'>Data type :&ensp;<p className='underline'>string</p></div>
                                <div className='flex text-[14px]'>Display value field :&ensp;<p className='underline'>value</p></div>
                                <div className='flex text-[14px]'>Display option :&ensp;<p className='underline'>opensea</p></div>
                                <div className='flex text-[14px]'>Trait type :&ensp;<p className='underline'>Background</p></div>
                            </div>
                            <div className='w-[227px] h-[157px] bg-[#40547A] rounded-xl p-3 '>
                                <div className='w-[24px] h-[24px] bg-red-500 flex justify-center items-center rounded-full absolute ml-[185px] mt-[-7px]'>
                                    <DeleteIcon className='scale-75'></DeleteIcon>
                                </div>
                                <div className='flex text-[14px] mt-2'>Name :&ensp;<p className='underline'>background</p></div>
                                <div className='flex text-[14px]'>Data type :&ensp;<p className='underline'>string</p></div>
                                <div className='flex text-[14px]'>Display value field :&ensp;<p className='underline'>value</p></div>
                                <div className='flex text-[14px]'>Display option :&ensp;<p className='underline'>opensea</p></div>
                                <div className='flex text-[14px]'>Trait type :&ensp;<p className='underline'>Background</p></div>
                            </div>
                            <div className='w-[227px] h-[157px] bg-[#40547A] rounded-xl p-3 '>
                                <div className='w-[24px] h-[24px] bg-red-500 flex justify-center items-center rounded-full absolute ml-[185px] mt-[-7px]'>
                                    <DeleteIcon className='scale-75'></DeleteIcon>
                                </div>
                                <div className='flex text-[14px] mt-2'>Name :&ensp;<p className='underline'>background</p></div>
                                <div className='flex text-[14px]'>Data type :&ensp;<p className='underline'>string</p></div>
                                <div className='flex text-[14px]'>Display value field :&ensp;<p className='underline'>value</p></div>
                                <div className='flex text-[14px]'>Display option :&ensp;<p className='underline'>opensea</p></div>
                                <div className='flex text-[14px]'>Trait type :&ensp;<p className='underline'>Background</p></div>
                            </div>
                        </div>
                    </div>
                    <div className='w-2/6 h-5/6 flex flex-col items-end  '>
                        <Conectwalet></Conectwalet>
                        <div className='w-[266px] h-[414px] border-[1px] border-white rounded-xl mt-[30px] flex flex-col items-center py-[10px] z-10' >
                            <p className='text-[24px] w-[231px] font-bold text-white text-center'>Origin Token Attributes</p>
                            <p className='text-[16px] w-[216px]  text-white pt-[15px]'>&emsp;Mostly NFT token will need attributes of it called metadata. Origin attributes is the static type of metadata. And it cannot be change ( but it can be override by token attributes we will discuss next step ).</p>
                            <p className='text-[16px] w-[216px]  text-white pt-[15px]'>&emsp; You can edit value of attributes by double click the value and change to your proper design.</p>
                        </div>
                        <div onClick={() => { setIsShow(!isShow) }} className='absolute text-[50px] mt-[750px] ml-[1150px] cursor-pointer hover:scale-150 hover:text-[#262f50] duration-500'>?</div>
                    </div>
                </div>
                {isShow ?
                    <div className='absolute duration-500' onClick={() => { setIsShow(!isShow) }}>
                        <Darkbg ></Darkbg>
                        <div className='absolute mt-[140px] ml-[-350px] z-20'>
                            <img src={logo3} className='mt-[80px] mr-[150px] rotate-[160deg] '></img>
                            <p className='ml-[300px] mt-[-60px] absolute w-full font-bold'>Double Click to edit</p>
                        </div>
                        <div className='absolute mt-[0px] ml-[-430px] z-20'>
                            <img src={logo2} className='mt-[50px] mr-[200px] rotate-[160deg] '></img>
                            <p className='ml-[-190px] mt-[-185px] absolute w-full font-bold'>Click to delete component</p>
                        </div>

                    </div>
                    :
                    <div></div>

                }
            </div>
        </div>
    )
}

export default NewIntregation7