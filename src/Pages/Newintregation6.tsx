import React, { useEffect } from 'react'
import { Button, CircularProgress } from '@mui/material'
import Conectwalet from '../component/Connectwallet'
import logo1 from '../pic/Chain/SIX Protocol Icon.png'
import logo2 from '../pic/Chain/Ethereum Icon.png'
import logo3 from '../pic/Chain/Klaytn Icon.png'
import logo4 from '../pic/Chain/bnb-bnb-logo 1.png'
import Stepper2 from '../component/Stepper2'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Darkbg from '../component/Alert/Darkbg'
import AlertCard from '../component/Alert/AlertCard'
import RedAleart from '../component/Alert/RedAleart'

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import WhiteBox from '../component/WhiteBox'
import BoxButton from '../component/BoxButton'
import Help from '../component/Alert/Help'
import GobackButton from '../component/GobackButton'
import axios from 'axios'
import { getAccessTokenFromLocalStorage, getOriginContractAddressFromLocalStorage, getSCHEMA_CODE, saveOriginContractAddressToLocalStorage } from '../helpers/AuthService'

const NewIntregation6 = () => {
    const [isLoading, setisLoading] = useState(false)
    const [isLoadingHistory, setIsLoadingHistory] = useState(false)

    const [text, setText] = useState([

        {
            Name: "Origin Chain",
            placeholder: "",
            value: "",
            require: true,
            Error: false,
        },
        {
            Name: "Chain Type",
            placeholder: "",
            value: ["Testnet", "Mainnet"],
            require: true,
            Error: true,
        },
        {
            Name: "Origin Contract Address",
            placeholder: "0x40df0C834CE7549e9234D11525aD1f7E7CF48E88",
            value: "",
            require: false,
            Error: true,
        },
        {
            Name: "Origin Base URI",
            placeholder: "https://ipfs.whalegate.sixprotocol.com/ipfs/Qmd9FJGWveLd1g6yZTDDNjxruVppyDtaUzrA2pkb2XAf8R/",
            value: "",
            require: false,
            Error: true,
        },

    ]);


    const [ChainType, setChainType] = useState("")
    const navigate = useNavigate();
    const [ml, setml] = useState(0)
    const [isSelection, setisSelection] = useState(false)
    const [isError, setisError] = useState(false)
    const handleml = (event: any) => {
        const id = event.target.id;
        console.log(id);
        setml(133 * id)
        setisSelection(true)
        setisError(false)
    }

    useEffect(() => {
        if (getSCHEMA_CODE()) {
            setisSelection(true)
            setisError(false)

        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSelection) {
            navigate('/newintregation/7');
        }
        else {
            setisError(true)
        }
        await saveOriginContractAddressAndOriginBaseURI();
    }

    const HandleText = (e) => {
        const updatedText = [...text];
        updatedText[e.target.id].value = e.target.value;
        console.log(text)
    }

    const saveOriginContractAddressAndOriginBaseURI = async () => {
        const apiUrl = `${import.meta.env.VITE_APP_API_ENDPOINT_SCHEMA_INFO}schema/set_schema_info`; // Replace with your API endpoint
        const requestData = {
            "payload": {
                "schema_info": {
                    "origin_data": {
                        "origin_chain": `${ChainType}`,
                        "origin_contract_address": `${text[2].value}`,
                        "origin_base_uri": `${text[3].value}`
                    }
                },
                "schema_code": getSCHEMA_CODE(),
                "status": "Draft",
                "current_state": "2"
            }
        }
            ;

        await axios.post(apiUrl, requestData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAccessTokenFromLocalStorage()}`,  // Set the content type to JSON
                // Add any other headers your API requires
            },
        })
            .then(response => {
                console.log('API Response saveOriginContractAddressAndOriginBaseURI :', response.data);
                console.log(requestData)
                // You can handle the API response here
            })
            .catch(error => {
                console.error('API Error:', error);
                // Handle errors here
            });

    }

    const getBaseURIFromContract = async () => {
        console.log("text[2].value: ", text[2].value)
        const updatedText = [...text];
        updatedText[3].value = "";
        setisLoading(true)
        const apiUrl = `${import.meta.env.VITE_APP_API_ENDPOINT_SCHEMA_INFO}schema/base_uri_from_contract`; // Replace with your API endpoint

        const params = {
            contract_address: `${text[2].value}`,
            chain_id: "98",
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
                const updatedText = [...text];
                updatedText[3].value = response.data.data.base_uri
                console.log(text)
                saveOriginContractAddressToLocalStorage(text[2].value)
                console.log(getOriginContractAddressFromLocalStorage())
            })
            .catch((error) => {
                // Handle errors here
                console.error('Error:', error);
            });
        setisLoading(false)
    }

    const GethistoryFormSchemaCode = async () => {

        // const updatedText = [...text];
        // updatedText[0].duplicate = true;
        setIsLoadingHistory(true)
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
                console.log('Response:', response.data);

                const updatedText = [...text];
                updatedText[2].value = response.data.data.schema_info.schema_info.origin_data.origin_contract_address ;
                updatedText[3].value = response.data.data.schema_info.schema_info.origin_data.origin_base_uri
                setChainType(response.data.data.schema_info.schema_info.origin_data.origin_chain) ;
                // updatedText[2].value = response.data.data.schema_info.schema_info.description;
                console.log(text)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        setIsLoadingHistory(false)
    }


    useEffect(() => {
        console.log("SCHEMACODE:", getSCHEMA_CODE())
        if (getSCHEMA_CODE()) {
            GethistoryFormSchemaCode();
        }
    }, []);
    return (
        <div className='w-full flex justify-center ' >
            <div className='w-full h-full fixed  flex justify-center items-center bg-gradient-24  from-white to-[#7A8ED7]'>
                <div className=' relative w-[1280px] h-[832px] bg-gradient-24 to-gray-700 from-gray-300 rounded-2xl flex justify-between p-4 shadow-lg shadow-black/20 dark:shadow-black/40'>
                    <div className='w-full h-full'>
                        <div className=' h-1/6'>
                            <div className='flex flex-rows justify-between'>
                                <Stepper2 ActiveStep={2}></Stepper2>
                            </div>
                            <div className='w-[931px] h-[1px] bg-[#D9D9D9]'></div>
                        </div>
                        {!isLoadingHistory &&
                            <div>
                                <form onSubmit={handleSubmit} className=' h-5/6  flex flex-col justify-start items-center py-[1%]  '>
                                    <div className='w-[758px] h-[121px] border-[1px] border-white rounded-xl p-2 flex  items-center justify-between px-[20px] z-10 '>
                                        <p className='font-bold text-[20px] '>{text[0].Name}</p>
                                        <div className='flex justify-between w-[70%] mr-10'>
                                            {isSelection && <div className='absolute border w-[100px] h-[100px] duration-300' style={{ marginLeft: `${ml}px` }}></div>}
                                            <Tooltip title="SIX Protocol">
                                                <div className='w-[100px] h-[100px] flex justify-center items-center'>
                                                    <img id='0' onClick={handleml} className='cursor-pointer z-10 w-[77px] h-[66px] hover:scale-125 duration-500' src={logo1}></img>
                                                </div>
                                            </Tooltip>
                                            <Tooltip title="Ethereum">
                                                <div className='w-[100px] h-[100px] flex justify-center items-center'>
                                                    <img id='1' onClick={handleml} className='cursor-pointer z-10 w-[38px] h-[68px] hover:scale-125 duration-500' src={logo2}></img>
                                                </div>
                                            </Tooltip>
                                            <Tooltip title="Klaytn">
                                                <div className='w-[100px] h-[100px] flex justify-center items-center'>
                                                    <img id='2' onClick={handleml} className='cursor-pointer z-10 w-[54px] h-[61px] hover:scale-125 duration-500' src={logo3}></img>
                                                </div>
                                            </Tooltip>
                                            <Tooltip title="BNB Smart Chain">
                                                <div className='w-[100px] h-[100px] flex justify-center items-center'>
                                                    <img id='3' onClick={handleml} className='cursor-pointer z-10 w-[60px] h-[62px] hover:scale-125 duration-500' src={logo4}></img>
                                                </div>
                                            </Tooltip>
                                            {/* <img id='1' onClick={handleml} className='cursor-pointer z-10 w-[38px] h-[68px] hover:scale-125 duration-500'  src={logo2}></img>
                                    <img id='2' onClick={handleml} className='cursor-pointer z-10 w-[54px] h-[61px] hover:scale-125 duration-500' src={logo3}></img>
                                    <img id='3' onClick={handleml} className='cursor-pointer z-10 w-[60px] h-[62px] hover:scale-125 duration-500' src={logo4}></img> */}
                                        </div>
                                        <div className='w-[15px] h-[15px] bg-[#D9D9D9] rounded-full absolute ml-[710px] mb-[90px]'></div>
                                    </div>
                                    <div className='mt-[3%]  w-[758px] h-[121px] border-[1px] border-white rounded-xl p-2 flex  items-center justify-between px-[20px] z-10 '>
                                        <p className='font-bold text-[20px] '>{text[1].Name}</p>
                                        <div className=' flex justify-center w-[80%]'>
                                            <Tooltip title="Testnet">
                                                <div
                                                    className={`${ChainType === "FIVENET" ? 'bg-[#c0c0c0]' : 'bg-transparent'} border p-2 hover:scale-110 hover:bg-[#c0c0c0] duration-500 cursor-pointer mr-[20%]`}
                                                    onClick={() => { setChainType("FIVENET") }}
                                                >
                                                    <p className=' text-2xl'>{text[1].value[0]}</p>
                                                </div>
                                            </Tooltip>
                                            <Tooltip title="Testnet">
                                                <div
                                                    className={`${ChainType === "SIXNET" ? 'bg-[#c0c0c0]' : 'bg-transparent'} border p-2 hover:scale-110 hover:bg-[#c0c0c0] duration-500 cursor-pointer`}
                                                    onClick={() => { setChainType("SIXNET") }}
                                                >
                                                    <p className=' text-2xl'>{text[1].value[1]}</p>
                                                </div>
                                            </Tooltip>
                                        </div>
                                        <div className='w-[15px] h-[15px] bg-[#D9D9D9] rounded-full absolute ml-[710px] mb-[90px]'></div>
                                    </div>
                                    <div className=' mt-[3%] w-[758px] h-[121px] border-[1px] border-white rounded-xl p-2 flex  items-center justify-between px-[20px] '>
                                        <p className='font-bold text-[20px] '>{text[2].Name}</p>
                                        <input
                                            id='2'
                                            value={text[2].value}
                                            onChange={(e) => { HandleText(e); getBaseURIFromContract(); }}
                                            type="text"
                                            placeholder={text[2].placeholder}
                                            className='bg-transparent text-[16px] border-[1px] border-[#D9D9D9DD] border-dashed p-1 focus:outline-none focus:scale-105 duration-1000 w-[429px] '>
                                        </input>
                                        <div className='w-[15px] h-[15px]  bg-transparent border rounded-full absolute ml-[710px] mb-[90px]'></div>
                                    </div>
                                    <div className=' mt-[3%] w-[758px] h-[141px] border-[1px] border-white rounded-xl p-2 flex flex-col items-start justify-center px-5 '>
                                        <p className='font-bold text-[24px] mr-10'>{text[3].Name}</p>
                                        <input
                                            value={text[3].value}
                                            id='3'
                                            type="text"
                                            placeholder={text[3].placeholder}
                                            className='placeholder-gray-300 placeholder:text-[12px] bg-transparent text-[24px] border-[1px] border-[#D9D9D9DD] border-dashed p-1  focus:outline-none focus:scale-[102%] duration-1000 w-full h-[62px]  '></input>
                                        <div className='w-[15px] h-[15px]  bg-transparent border rounded-full absolute ml-[710px] mb-[90px]'></div>
                                    </div>
                                    <div className='  flex justify-start absolute left-0 bottom-0 '>
                                        <div className={``}>
                                            <GobackButton BackPage='/newintregation/5'></GobackButton>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        }
                        {isLoadingHistory &&
                            <div className='w-full h-full flex justify-center items-center scale-[500%] '>
                                <CircularProgress className=" mb-[6%] text-white" sx={{
                                    width: 1000,
                                    color: 'white',
                                }}
                                ></CircularProgress>
                            </div>
                        }

                    </div>
                    <div className='w-2/6 h-full flex flex-col items-end  '>
                        <Conectwalet></Conectwalet>
                        <WhiteBox
                            Title={'Origin Chain'}
                            DeTail={'A Chain that your NFT was or going to be published.'}
                            Height={414} Width={266} TitleSize={24} DetailSize={14}>
                        </WhiteBox>
                        <WhiteBox
                            Title={'Origin Contract Address'}
                            DeTail={'A deployed contract address of your NFT (aka ERC721), this is not required now in draft version. But it will be required before you deploy on testnet and mainnet'}
                            Height={414} Width={266} TitleSize={20} DetailSize={14}>
                        </WhiteBox>
                        <WhiteBox
                            Title={'Origin Base URI'}
                            DeTail={'An existing endpoint URL you use as NFT metadata. This is not required in case you plan to create all attributes in Gen 2'}
                            Height={414} Width={266} TitleSize={24} DetailSize={14}>
                        </WhiteBox>
                        <div className=' w-[266px] h-full flex  justify-between items-center  mt-8'>
                            <div onClick={() => { navigate('/newintregation/7') }}>
                                <BoxButton BorderRadius={0} FontSize={30} TextTitle={'SKIP'}></BoxButton>
                            </div>
                            <div onClick={handleSubmit} >
                                <BoxButton BorderRadius={0} FontSize={30} TextTitle={'NEXT'}></BoxButton>
                            </div>
                        </div>

                        <div className=' w-full h-full flex justify-end items-end '>
                            <Help></Help>
                        </div>
                    </div>
                </div>
                {isError &&
                    <div className='absolute duration-500' onClick={() => { setisError(false); }}>
                        <Darkbg ></Darkbg>
                        <AlertCard BG={1} ML={320} MT={-250} Width={266} Height={140} heaDer="Required" detailsText="Origin Chain is required. Please choose one of the supported Chain"  ></AlertCard>
                        <RedAleart Height={20} Width={120} Rotate={90} ML={174} MT={-187} detailsText="Require" ></RedAleart>
                    </div>
                }
            </div>
        </div>

    )
}

export default NewIntregation6