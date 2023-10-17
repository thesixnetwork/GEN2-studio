import React, { useEffect, useState } from 'react'
import { TypeAnimation } from 'react-type-animation';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import InputText from './InputText';
import EastIcon from '@mui/icons-material/East';
import NormalButton from './NormalButton';
import { styled } from '@mui/material';
import ClearIcon from "@mui/icons-material/Clear";
import { getAccessTokenFromLocalStorage, getSCHEMA_CODE } from '../helpers/AuthService';
import axios from 'axios';
import logo from '../pic/Group 348.png'
import { useNavigate } from 'react-router-dom';

interface MyComponentProps {
    Height: number;
    Width: number;
    detailsText: string;
    ML: number;
    MT: number;

}


export default function EnterBox(props: MyComponentProps) {

    const [showI, setshowI] = React.useState(false)
    const [showII, setshowII] = React.useState(false)

    const Delete = styled(ClearIcon)({
        borderRadius: "16px",
        transition: "color 0.3s, border 0.3s",
        border: "2px solid white",
        cursor: "pointer",
    });

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setshowI(true)
        }, 2300);

        FindSchemaCode()
    }, [])

    const [actionName, setactionName] = useState("")
    const [actionDes, setactionDes] = useState("")
    const [actionWhen, setactionWhen] = useState("")

    const FindSchemaCode = async () => {
        const apiUrl = `https://six-gen2-studio-nest-backend-api-traffic-gateway-1w6bfx2j.ts.gateway.dev/schema/get_schema_info/${getSCHEMA_CODE()}`; // Replace with your API endpoint
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
                console.log('Response:', response.data);
                setactionName(response.data.data.schema_info.schema_info.onchain_data.actions[0].name);
                setactionDes(response.data.data.schema_info.schema_info.onchain_data.actions[0].desc);
                setactionWhen(response.data.data.schema_info.schema_info.onchain_data.actions[0].when);
            })
            .catch((error) => {
                // Handle errors here
                console.error('Error:', error);
            });
    }

    const navigate = useNavigate();

    return (
        <div style={{ width: `${props.Width}px`, height: `${props.Height}px`, marginLeft: `${props.ML}px`, marginTop: `${props.MT}px` }}
            className='flex-col p-3 border border-white bg-transparent  rounded-xl  flex  justify-start items-start  shadow-md '>
            <div className='w-full flex justify-end items-end'>
                <Delete
                    className=" hover:border-red-600 hover:text-red-600"
                />
            </div>
            <div>
                <p>Name : {actionName}</p>
                <p>Description : {actionDes}</p>
                <p>Parameters : { }</p>
                <p>When : {actionWhen}</p>
                <div className=' flex justify-start items-center '>
                    <p>Then : { }</p>
                    <div className=' hover:scale-75 duration-500 scale-50 cursor-pointer' onClick={()=>{navigate("/newintregation/beginer/then")} }>
                        <img src={logo}></img>
                    </div>
                </div>

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