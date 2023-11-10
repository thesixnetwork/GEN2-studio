import React, { useEffect } from 'react'
import Conectwalet from '../component/Connectwallet'
import Stepper2 from '../component/Stepper2';
import Darkbg from '../component/Alert/Darkbg';
import WhiteBox from '../component/WhiteBox';

import Add from "../pic/Group 40.png";
import { useNavigate } from 'react-router-dom';
import NormalButton from '../component/NormalButton';
import Help from '../component/Alert/Help';
import EnterBoxII from '../component/EnterBox copy';
import { getAccessTokenFromLocalStorage, getSCHEMA_CODE } from '../helpers/AuthService';
import axios from 'axios';


export default function Newintregation9() {
    const [isShow, setIsShow] = React.useState(false);
    const navigate = useNavigate();

    const FindSchemaCode = async () => {
        const apiUrl = `${
            import.meta.env.VITE_APP_API_ENDPOINT_SCHEMA_INFO
          }schema/get_schema_info/${getSCHEMA_CODE()}`; // Replace with your API endpoint
        const params = {
        };
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAccessTokenFromLocalStorage()}`,
        }
        // Make a GET request with parameters
        await axios.get(apiUrl, {
            params: params, // Pass parameters as an object
            headers: headers, // Pass headers as an object
        })
            .then((response) => {
                // Handle successful response here
                console.log('Response Action:', response.data);
            })
            .catch((error) => {
                // Handle errors here
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        FindSchemaCode()
    }, [])

    return (
        <div className='w-full flex justify-center ' >
            <div className='w-full h-full fixed  flex justify-center items-center bg-gradient-24  from-white to-[#7A8ED7]'>
                <div className='w-[1280px] h-[832px] bg-gradient-24 to-gray-700 from-gray-300 rounded-2xl flex justify-between p-4 shadow-lg shadow-black/20 dark:shadow-black/40'>
                    <div className='w-full h-full px-[20px]'>
                        <div>
                            <Stepper2 ActiveStep={6}></Stepper2>
                            <div className='w-[931px] h-[1px] bg-[#D9D9D9]'></div>
                        </div>
                        <div className='w-full h-[500px] flex flex-col justify-between items-center mt-[30px]'>
                            <div className=''>
                                <EnterBoxII Height={380} Width={931} detailsText={''} ML={0} MT={0}></EnterBoxII>
                            </div>
                            <div
                                id="plus"
                                onClick={() => navigate('/newintregation/beginer/1')}
                                className="mt-[20px] w-full h-[127px] flex justify-center items-center bg-transparent border border-white rounded-xl p-3 hover:scale-[102%] cursor-pointer duration-300  "
                            >
                                <img src={Add}></img>

                            </div>
                        </div>
                    </div>
                    <div className='w-2/6 h-[full] flex flex-col items-center justify-between  '>
                        <Conectwalet></Conectwalet>
                        <WhiteBox Title='Action Name' DeTail='Name of action must be unique. And will call action by its name when we want to perform it' Height={180} Width={320} TitleSize={0} DetailSize={10}></WhiteBox>
                        <WhiteBox Title='Description' DeTail='To clarify what is the action mean'></WhiteBox>
                        <WhiteBox Title='Parameters' DeTail='Some action might require parameter to perform it'></WhiteBox>
                        <WhiteBox Title='Condition and Action' DeTail='Action can be perform while condition is met. When condition is unmet tx will be error'></WhiteBox>
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