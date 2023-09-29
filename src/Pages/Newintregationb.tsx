import React from 'react'
import Conectwalet from '../component/Connectwallet'
import Stepper2 from '../component/Stepper2';
import Darkbg from '../component/Alert/Darkbg';
import Box from '../component/Box';

import Add from "../pic/Group 40.png";
import { useNavigate } from 'react-router-dom';
import NormalButton from '../component/NormalButton';
import Help from '../component/Alert/Help';


export default function Newintregation9() {
    const [isShow, setIsShow] = React.useState(false);
    const navigate = useNavigate();
    return (
        <div className='w-full flex justify-center ' >
            <div className='w-full h-full fixed  flex justify-center items-center bg-gradient-24  from-white to-[#7A8ED7]'>
                <div className='w-[1280px] h-[832px] bg-gradient-24 to-gray-700 from-gray-300 rounded-2xl flex justify-between p-4 shadow-lg shadow-black/20 dark:shadow-black/40'>
                    <div className='w-full h-full px-[20px]'>
                        <div>
                            <Stepper2 ActiveStep={6}></Stepper2>
                            <div className='w-[931px] h-[1px] bg-[#D9D9D9]'></div>
                        </div>
                        <div className='w-full h-full'>
                            <div
                                id="plus"
                                onClick={() => navigate('/newintregation/beginer/1')}
                                className="mt-[20px] w-[267px] h-[187px] flex justify-center items-center bg-transparent border border-white rounded-xl p-3 hover:scale-105 cursor-pointer duration-300  "
                            >
                                <img src={Add}></img>

                            </div>
                        </div>
                    </div>
                    <div className='w-2/6 h-[full] flex flex-col items-center justify-between  '>
                        <Conectwalet></Conectwalet>
                        <Box Title='Action Name' DeTail='Name of action must be unique. And will call action by its name when we want to perform it'></Box>
                        <Box Title='Description' DeTail='To clarify what is the action mean'></Box>
                        <Box Title='Parameters' DeTail='Some action might require parameter to perform it'></Box>
                        <Box Title='Condition and Action' DeTail='Action can be perform while condition is met. When condition is unmet tx will be error'></Box>

                        <div className='flex w-full  justify-between items-end px-2  '>
                            <div  >
                                <NormalButton TextTitle="RESET" BorderRadius={0} FontSize={24}></NormalButton>
                            </div>
                            <div  >
                                <NormalButton TextTitle="NEXT" BorderRadius={0} FontSize={24}></NormalButton>
                            </div>
                            <div onClick={() => { setIsShow(!isShow) }}>
                                <Help></Help>
                            </div>
                        </div>
                    </div>
                </div>
                {isShow &&
                    <div className='absolute duration-500' onClick={() => { setIsShow(!isShow) }}>
                        <Darkbg ></Darkbg>
                    </div>
                }
            </div>
        </div>

    )
}