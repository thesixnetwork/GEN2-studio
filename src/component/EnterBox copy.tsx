import React, { useEffect, useState } from 'react'
import { TypeAnimation } from 'react-type-animation';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import InputText from './InputText';
import EastIcon from '@mui/icons-material/East';
import NormalButton from './NormalButton';
import { styled } from '@mui/material';
import ClearIcon from "@mui/icons-material/Clear";
import { getAccessTokenFromLocalStorage, getSCHEMA_CODE, saveActionName } from '../helpers/AuthService';
import axios from 'axios';
import logo from '../pic/Group 348.png'
import { useNavigate } from 'react-router-dom';

interface MyComponentProps {
    actionName:string;
    actionDes:string;
    actionWhen:string;
    actionThen:string[];
    params:string;
}

export default function EnterBox(props: MyComponentProps) {

    const [showI, setshowI] = React.useState(false)
    const [showII, setshowII] = React.useState(false)

    const [actionName, setactionName] = useState("")
    const [actionDes, setactionDes] = useState("")
    const [actionWhen, setactionWhen] = useState("")
    const [actionThen, setactionThen] = useState("")
    const [params, setParams] = useState([])

    const Delete = styled(ClearIcon)({
        borderRadius: "16px",
        transition: "color 0.3s, border 0.3s",
        border: "2px solid white",
        cursor: "pointer",
    });

    // useEffect(() => {
    //     const timeoutId = setTimeout(() => {
    //         setshowI(true)
    //     }, 2300);

    //     FindSchemaCode()
    // }, [])

    // const FindSchemaCode = async () => {
    //     const apiUrl = `https://six-gen2-studio-nest-backend-api-traffic-gateway-1w6bfx2j.ts.gateway.dev/schema/get_schema_info/${getSCHEMA_CODE()}`; // Replace with your API endpoint
    //     const params = {
    //     };
    //     const headers = {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${getAccessTokenFromLocalStorage()}`,
    //     }
    //     // Make a GET request with parameters
    //     await axios.get(apiUrl, {
    //         params: params, // Pass parameters as an object
    //         headers: headers, // Pass headers as an object
    //     })
    //         .then((response) => {
    //             // Handle successful response here
    //             console.log('Response:', response.data);
    //             setactionName(response.data.data.schema_info.schema_info.onchain_data.actions[0].name);
    //             setactionDes(response.data.data.schema_info.schema_info.onchain_data.actions[0].desc);
    //             setactionWhen(response.data.data.schema_info.schema_info.onchain_data.actions[0].when);
    //             setactionThen(response.data.data.schema_info.schema_info.onchain_data.actions[0].then);
    //         })
    //         .catch((error) => {
    //             // Handle errors here
    //             console.error('Error:', error);
    //         });
    // }

    const getParams = () => {
        if(props.actionWhen !== undefined && props.actionWhen !== undefined){

            const findParams = (string: string) => {
                const regex = /params\['([^']+)'\]/g;
                let matches = [];
                let match;
                
                while (match = regex.exec(string)) {
                    matches.push(match[1]);
                }
                
                return matches.length > 0 ? matches : null;
            }
            
            
            const myString = `${props.actionWhen}, ${props.actionThen.join(', ')}`
            const result = findParams(myString);
            setParams(result)
        }
    }



    useEffect(() => {
        getParams()
    }, [])

    const saveAction = async () => {
        const apiUrl = 'https://six-gen2-studio-nest-backend-api-traffic-gateway-1w6bfx2j.ts.gateway.dev/schema/set_actions'; // Replace with your API endpoint
        const requestData = {
            "payload": {
                "schema_code": getSCHEMA_CODE(),
                "name": actionName,
                "then": "",
                "params": [],
            }
        };

        await axios.post(apiUrl, requestData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAccessTokenFromLocalStorage()}`,  // Set the content type to JSON
                // Add any other headers your API requires
            },
        })
            .then(response => {
                console.log('API Response saveOnchainCollectionAttributes :', response.data);
                console.log("Request :", requestData)
                // You can handle the API response here
            })
            .catch(error => {
                console.error('API Error:', error);
                // Handle errors here
            });

    }

    const navigate = useNavigate();

    return (
        <div className=' w-[900px] flex-col p-3 border border-white bg-transparent  rounded-xl  flex  justify-start items-start  shadow-md '>
            <div className='w-full flex justify-end items-end'>
                <Delete
                    className=" hover:border-red-600 hover:text-red-600"
                />
            </div>
            <div>
                <p>Name : {props.actionName}</p>
                <p>Description : {props.actionDes}</p>
                <p>Parameters : {params !== null && params !== undefined && params.join(', ')}</p>
                <p>When : {props.actionWhen}</p>
                <div className=' flex flex-col justify-start items-start '>
                    {/* <p>Then : {actionThen }</p> */}
                    <div>
                        <p>Then : </p>
                        { props.actionThen && props.actionThen.length > 0 ? (
                            <ul className="ml-8">
                                {props.actionThen.map((item, index) => (
                                    <li key={index} className="list-disc">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            null
                        )}

                    </div>

                    <div className=' ml-10 hover:scale-75 duration-500 scale-50 cursor-pointer' onClick={() => { saveActionName(props.actionName) ; navigate("/newintregation/beginer/then") }}>
                        <img src={logo}></img>
                    </div>
                </div>
                {/* <div className='mt-[0]' onClick={saveAction}>
                    <NormalButton TextTitle="SAVE" BorderRadius={0} FontSize={24}></NormalButton>
                </div> */}
            </div>
            {/* <TypeAnimation
                className='  text-white font-bold'
                sequence={[
                    `Name:${actionName}\nDescription:${actionDes}\nParameters:\nWhen:${actionWhen}\nThem: +`,
                    2000,
                    `Name:${actionName}\nDescription:${actionDes}\nParameters:\nWhen:${actionWhen}\nThem: +`,
                ]}
                speed={50}
                style={{ whiteSpace: 'pre-line', fontSize: '15px', }}
                repeat={0}
                preRenderFirstString={false}
            /> */}
        </div>
    )
}