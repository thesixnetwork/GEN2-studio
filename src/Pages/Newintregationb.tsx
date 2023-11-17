import React, { useEffect, useState } from 'react'
import Conectwalet from '../component/Connectwallet'
import Stepper2 from '../component/Stepper2';
import Darkbg from '../component/Alert/Darkbg';
import WhiteBox from '../component/WhiteBox';

import Add from "../pic/Group 40.png";
import { useNavigate } from 'react-router-dom';
import NormalButton from '../component/NormalButton';
import Help from '../component/Alert/Help';
import EnterBoxII from '../component/EnterBox copy';
import { clearOriginContractAddressFromLocalStorage, clearSCHEMA_CODE, getAccessTokenFromLocalStorage, getSCHEMA_CODE } from '../helpers/AuthService';
import axios from 'axios';
import GobackButtonValidate from '../component/GobackButtonValidate';
import Swal from 'sweetalert2';



export default function Newintregation9() {
    const [currentState, setCurrentState] = useState(6)
    const [isShow, setIsShow] = React.useState(false);
    const navigate = useNavigate();
    const [action, setAction] = React.useState([]);

    const FindSchemaCode = async () => {
        const apiUrl = `${import.meta.env.VITE_APP_API_ENDPOINT_SCHEMA_INFO}schema/get_schema_info/${getSCHEMA_CODE()}`; // Replace with your API endpoint
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
                if (response.data.data.schema_info.current_state >= currentState) {
                    setCurrentState(response.data.data.schema_info.current_state)
                }
                const Action = response.data.data.schema_info.schema_info.onchain_data.actions;
                setAction(Action)
                console.log('Response Action:', response.data);
                // setactionName(response.data.data.schema_info.schema_info.onchain_data.actions[0].name);
                // setactionDes(response.data.data.schema_info.schema_info.onchain_data.actions[0].desc);
                // setactionWhen(response.data.data.schema_info.schema_info.onchain_data.actions[0].when);
                // setactionThen(response.data.data.schema_info.schema_info.onchain_data.actions[0].then);
            })
            .catch((error) => {
                // Handle errors here
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        FindSchemaCode()

    }, [])

    const nextPage = () => {
        if (action.length === 0) {
            navigate('/')
        }
        else {
            Swal.fire({
                title: 'Are you sure to save draft ?',
                text: "Your draft can edit in edition page",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#7A8ED7',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Save draft'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/');
                    clearSCHEMA_CODE();
                    clearOriginContractAddressFromLocalStorage();
                }
            })

        }
    }

    return (
        <div className='w-full flex justify-center ' >
            <div className='w-full h-full fixed  flex justify-center items-center bg-gradient-24  from-white to-[#7A8ED7]'>
                <div className=' relative w-[1280px] h-[832px] bg-gradient-24 to-gray-700 from-gray-300 rounded-2xl flex justify-between p-4 shadow-lg shadow-black/20 dark:shadow-black/40'>
                    <div className='w-full h-full px-[20px]'>
                        <div>
                            <Stepper2 CurrentState={currentState} ActiveStep={6}></Stepper2>
                            <div className='w-[931px] h-[1px] bg-[#D9D9D9]'></div>
                        </div>
                        <div className='w-full h-5/6 overflow-scroll py-6 gap-y-6 flex  items-center flex-col'>
                            {action.map((item, index) => (
                                <div className='' key={index}>
                                    <EnterBoxII actionName={item.name} actionDes={item.desc} actionWhen={item.when} params={''} actionThen={item.then} ></EnterBoxII>
                                </div>
                            ))}
                            <div
                                id="plus"
                                onClick={() => navigate('/newintregation/beginer/1')}
                                className="mt-[20px] w-[900px] h-[127px] flex justify-center items-center bg-transparent border border-white rounded-xl p-3 hover:scale-[102%] cursor-pointer duration-300  "
                            >
                                <img src={Add}></img>

                            </div>
                        </div>
                    </div>
                    <div className='w-2/6 h-[full] flex flex-col items-center justify-between  '>
                        <Conectwalet></Conectwalet>
                        <WhiteBox Title='Action Name' DeTail='Name of action must be unique. And will call action by its name when we want to perform it' Height={150} Width={266} TitleSize={0} DetailSize={14}></WhiteBox>
                        <WhiteBox Title='Description' DeTail='To clarify what is the action mean' Height={150} Width={266} TitleSize={0} DetailSize={14}></WhiteBox>
                        <WhiteBox Title='Parameters' DeTail='Some action might require parameter to perform it' Height={150} Width={266} TitleSize={0} DetailSize={14}></WhiteBox>
                        <WhiteBox Title='Condition and Action' DeTail='Action can be perform while condition is met. When condition is unmet tx will be error' Height={150} Width={266} TitleSize={0} DetailSize={14}></WhiteBox>

                        <div className='flex w-full  justify-between items-end px-2  '>
                            <div  >
                                <NormalButton TextTitle="RESET" BorderRadius={0} FontSize={24}></NormalButton>
                            </div>
                            <div onClick={() => { nextPage() }} >
                                <NormalButton TextTitle="NEXT" BorderRadius={0} FontSize={24}></NormalButton>
                            </div>
                            <div onClick={() => { setIsShow(!isShow) }}>
                                <Help></Help>
                            </div>
                        </div>
                    </div>

                    <div className='  flex justify-start  absolute left-0 bottom-0 '>
                        <GobackButtonValidate BackPage={'/newintregation/9'} goBackCondition={true}></GobackButtonValidate>
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