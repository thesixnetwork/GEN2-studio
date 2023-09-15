import React from 'react'
import Connectwallet from '../component/Connectwallet'
import logo1 from "../pic/Vector 4.png"
import { useNavigate } from 'react-router-dom';
//redux
import { useSelector } from "react-redux";
import { walletcounterSelector } from "../store/slices/walletcounterSlice";
import Help from '../component/Alert/Help';
import { Tooltip } from '@mui/material';

const Connect = () => {
    //redux
    const walletcounterReducer = useSelector(walletcounterSelector);

    // Navigate
    const navigate = useNavigate();

    const [isShow, setIsShow] = React.useState(false);
    React.useEffect(() => {
        if (walletcounterReducer.isloggin) {
            navigate('/')
        }

    }, [walletcounterReducer.cosmosbalance]);
    return (
        <div className='w-full flex justify-center ' >
            <div className='w-full h-full fixed  flex justify-center items-center bg-gradient-24 from-white to-[#7A8ED7]'>
                <div className='w-[1280px] h-[832px] bg-gradient-24 to-gray-700 from-gray-300 rounded-2xl flex justify-center items-center p-4 shadow-lg shadow-black/20 dark:shadow-black/40'>
                    <Connectwallet></Connectwallet>
                </div>
                <div onClick={() => { setIsShow(!isShow) }} className='absolute text-[50px] mt-[750px] ml-[1150px]' >
                    <Help></Help>
                </div>
                {isShow &&
                    <div className='absolute mt-[-450px] ml-[-700px] duration-500'>
                        <img src={logo1} className='mt-[50px] ml-[400px] -rotate-[220deg] absolute '></img>
                        <div className='w-[352px] h-[142px] border rounded-2xl flex flex-col p-4'>
                            <p className='font-bold text-[32px]'>Button</p>
                            <p>Anything in the  rectangles (no rounded corner) most likely are buttons.</p>
                        </div>
                    </div>
                }
                {isShow &&
                    <div className='absolute mt-[350px] ml-[-700px] duration-500'>
                        <img src={logo1} className='mt-[-200px] ml-[100px] -rotate-[10deg] absolute '></img>
                        <div className='w-[352px] h-[142px] border rounded-2xl flex justify-center items-center flex-col p-4'>
                            <p className='font-bold text-[32px]'>Information</p>
                            <p>Anything in the rounded-corner rectangles most likely are information card, box which does not need your action.</p>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Connect