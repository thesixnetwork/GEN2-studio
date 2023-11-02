import React, { useCallback, useEffect, useRef, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from 'sweetalert2';
import axios from 'axios';
import { getAccessTokenFromLocalStorage, getSCHEMA_CODE } from '../helpers/AuthService';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { createTheme } from '@mui/material';

interface ComponentProps {
    Title: string
    Index: number
    Discard: boolean
    Save: boolean
}

function DraftOrigindataCard(Props: ComponentProps) {
    const navigate = useNavigate();
    const { schema_revision } = useParams();
    // console.log("Info :", Props.Info)
    const [loading, setLoading] = useState(false)
    const [isInputDisabledOriginChain, setisInputDisabledOriginChain] = useState(true)
    const [schemaInfo, setschemaInfo] = useState({})
    const [FirstschemaInfo, setFirstschemaInfo] = useState({})
    const [selectedNetwork, setSelectedNetwork] = useState('1');

    // const handleChangeValue = (e, stateVariable: string) => {
    //     setschemaInfo((prevState) => ({
    //         ...prevState,
    //         [stateVariable]: e.target.value
    //     }));
    //     console.log(schemaInfo)
    // }

    const handleRefresh = () => {
        window.location.reload();
    };

    const DISCARD = () => {
        setschemaInfo(FirstschemaInfo);

        // console.log("FirstschemaInfo :", FirstschemaInfo)
        // console.log("schemaInfo :", schemaInfo)
        // setschemaInfo((prevState) => {
        //     const newState = { ...prevState };


        //     newState.schema_info.description = FirstschemaInfo.schema_info.description;

        //     return newState;
        // });
    }
    // console.log("schemaInfo :",schemaInfo.schema_info)


    useEffect(() => {


        DISCARD()
        handleResetDefault()

    }, [Props.Discard])

    const saveData = async () => {
        console.log(":::::::::: saveDataFunction ::::::::")
        const apiUrl = 'https://six-gen2-studio-nest-backend-api-traffic-gateway-1w6bfx2j.ts.gateway.dev/schema/set_schema_info';
        const requestData = {
            "payload": {
                "schema_info": schemaInfo.schema_info,
                "schema_code": schemaInfo.schema_code,
                "status": "Draft",
                "current_state": "0"
            }
        }

        await axios.post(apiUrl, requestData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAccessTokenFromLocalStorage()}`,  // Set the content type to JSON
                // Add any other headers your API requires
            },
        })
            .then(response => {
                console.log('API Response saveOriginContractAddressAndOriginBaseURI :', response.data);
                console.log("Request :", requestData)
                // You can handle the API response here
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Attributes saved",
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .catch(error => {
                console.error('API Error:', error);
                // Handle errors here
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Something went wrong",
                    showConfirmButton: false,
                    timer: 1500,
                });
            });
    }


    useEffect(() => {
        // setData((prevState) => ({
        //     ...prevState,
        //     "name": schemaInfo.collectionname,
        // }));
        console.log("Props.Save :", Props.Save)
        saveData()
    }, [Props.Save])

    // useEffect(() => {

    //     setData(Props.Info.schema_info)
    //     console.log("Props.Info :",Props.Info)
    //     setschemaInfo(Props.Info);
    //     console.log("schemaInfo :",schemaInfo)

    //     // setschemaInfo({
    //     //     schemacode: Props.Info.schema_name,
    //     //     collectionname: Props.Info.schema_info.name,
    //     //     description: Props.Info.schema_info.description,
    //     //     originchain: Props.Info.schema_info.origin_data.origin_chain,
    //     //     origincontractaddress: Props.Info.schema_info.origin_data.origin_contract_address,
    //     //     originbaseURI: Props.Info.schema_info.origin_data.origin_base_uri,
    //     // });

    //     setFirstschemaInfo(Props.Info)

    //     // setFirstschemaInfo({
    //     //     schemacode: Props.Info.schema_name,
    //     //     collectionname: Props.Info.schema_info.name,
    //     //     description: Props.Info.schema_info.description,
    //     //     originchain: Props.Info.schema_info.origin_data.origin_chain,
    //     //     origincontractaddress: Props.Info.schema_info.origin_data.origin_contract_address,
    //     //     originbaseURI: Props.Info.schema_info.origin_data.origin_base_uri,
    //     // })

    // }, [])



    const FindSchemaCode = async () => {
        const apiUrl = `https://six-gen2-studio-nest-backend-api-traffic-gateway-1w6bfx2j.ts.gateway.dev/schema/get_schema_info/${schema_revision}`;
        const params = {};
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`,
        };
        await axios
            .get(apiUrl, {
                params: params,
                headers: headers,
            })
            .then((response) => {
                console.log("SchemaInFo :", response.data.data.schema_info)
                setschemaInfo(response.data.data.schema_info)
                setFirstschemaInfo(response.data.data.schema_info)
                setLoading(true)
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    useEffect(() => {
        FindSchemaCode();
    }, [])

    const handleNetworkChange = (event) => {
        // Add your condition here
        if (!isInputDisabledOriginChain) {
            setSelectedNetwork(event.target.value);
        } else {
            // Prevent the change by setting the value back to the current selectedNetwork
            setSelectedNetwork(selectedNetwork);
        }

    };

    const handleResetDefault = () => {
        setSelectedNetwork('1'); // Reset to the default value
    };

    const handleChangeValue = (e, stateVariable) => {
        setschemaInfo((prevState) => {
            const newState = { ...prevState };

            if (stateVariable === "schema_info.origin_data.origin_base_uri") {
                newState.schema_info.origin_data.origin_base_uri = e.target.value;
            } else if (stateVariable === "schema_info.origin_data.origin_contract_address") {
                newState.schema_info.origin_data.origin_contract_address = e.target.value;
            } else if (stateVariable === "schema_info.schema_name") {
                newState.schema_name = e.target.value;
            } else if (stateVariable === "schema_info.schema_info.name") {
                newState.schema_info.name = e.target.value;
            } else if (stateVariable === "schema_info.schema_info.description") {
                newState.schema_info.description = e.target.value;
            }

            return newState;
        });

        console.log(schemaInfo);
    };

    const selectFieldStyles = {
        ".MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffffff",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffffff",
            borderWidth: "thin",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffffff",
            borderWidth: "thin",
        },
    };

    return (
        <div className=' mt-10 w-[90%] border border-white rounded-xl p-5 relative'>
            <div
                onClick={() => setisInputDisabledOriginChain(!isInputDisabledOriginChain)}
                className=' flex justify-center items-center absolute right-2 top-2 border-white border rounded-full w-10 h-10 hover:scale-105 duration-500 cursor-pointer ' >
                <EditIcon></EditIcon>
            </div>
            <h1 className=' text-3xl '>{Props.Title}</h1>
            {(Props.Index === 0 && loading) && (
                <div className=' m-5 flex flex-col'>
                    <div className=' flex  justify-start items-end'>
                        <p className="font-bold text-xl mr-4">Schema Code : </p>
                        <input
                            value={schemaInfo.schema_name}
                            type="text"
                            disabled={true}
                            onChange={(e) => {
                                handleChangeValue(e, "schema_info.schema_name");
                            }}
                            className={` w-[20%]  bg-transparent text-[14px] border-[1px] border-none placeholder-gray-300 border-dashed p-1 focus:outline-none focus:scale-105 duration-500 w-[140px]`}
                        ></input>
                    </div>
                    <div className=' flex  justify-start items-end mt-5'>
                        <p className="font-bold text-xl mr-4">Collection Name : </p>
                        <input
                            value={schemaInfo.schema_info.name}
                            type="text"
                            disabled={isInputDisabledOriginChain}
                            onChange={(e) => {
                                handleChangeValue(e, "schema_info.schema_info.name");
                            }}
                            className={` w-[30%] bg-transparent text-[14px] border-[1px] ${isInputDisabledOriginChain ? 'border-none' : 'border-[#D9D9D9DD]'} placeholder-gray-300 border-dashed p-1 focus:outline-none focus:scale-105 duration-500 w-[140px]`}
                        ></input>
                    </div>
                    <div className=' flex  justify-start items-end mt-5'>
                        <p className="font-bold text-xl mr-4">Description : </p>
                        <input
                            value={schemaInfo.schema_info.description}
                            type="text"
                            disabled={isInputDisabledOriginChain}
                            onChange={(e) => {
                                handleChangeValue(e, "schema_info.schema_info.description");
                            }}
                            className={`w-[50%] bg-transparent text-[14px] border-[1px] ${isInputDisabledOriginChain ? 'border-none' : 'border-[#D9D9D9DD]'} placeholder-gray-300 border-dashed p-1 focus:outline-none focus:scale-105 duration-500 w-[140px]`}
                        ></input>
                    </div>
                </div>
            )}

            {(Props.Index === 1 && loading) && (
                <div className=' m-5'>
                    <div className=' flex  justify-start items-center'>
                        <p className="font-bold text-xl mr-2">Origin Chain : </p>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel className='' htmlFor="grouped-native-select">NETWORK</InputLabel>
                            <Select sx={selectFieldStyles} native value={selectedNetwork} onChange={handleNetworkChange} id="grouped-native-select" label="Grouping">
                                <option aria-label="None" value="" />
                                <optgroup label="Mainnet">
                                    <option value={1}>SIXNET</option>
                                    <option value={2}>ETHEREUM</option>
                                    <option value={3}>KLAYTN</option>
                                    <option value={4}>BSC</option>
                                </optgroup>
                                <optgroup label="Testnet">
                                    <option value={5}>FIVENET</option>
                                    <option value={6}>GOERLI</option>
                                    <option value={7}>BAOBAB</option>
                                    <option value={8}>BSCTEST</option>
                                </optgroup>
                            </Select>
                        </FormControl>
                    </div>
                    <div className=' flex  justify-start items-end mt-5'>
                        <p className="font-bold text-xl mr-6">Origin Contract Address : </p>
                        <input
                            value={schemaInfo.schema_info.origin_data.origin_contract_address}
                            type="text"
                            disabled={isInputDisabledOriginChain}
                            onChange={(e) => {
                                handleChangeValue(e, "schema_info.origin_data.origin_contract_address");
                            }}
                            className={` w-[50%] bg-transparent text-[14px] border-[1px] ${isInputDisabledOriginChain ? 'border-none' : 'border-[#D9D9D9DD]'} placeholder-gray-300 border-dashed p-1 focus:outline-none focus:scale-105 duration-500 w-[140px]`}
                        ></input>
                    </div>
                    <div className=' flex  justify-start items-end mt-5'>
                        <p className="font-bold text-xl mr-6">Origin Base URI : </p>
                        <input
                            value={schemaInfo.schema_info.origin_data.origin_base_uri}
                            type="text"
                            disabled={isInputDisabledOriginChain}
                            onChange={(e) => {
                                handleChangeValue(e, "schema_info.origin_data.origin_base_uri");
                            }}
                            className={` w-[70%] bg-transparent text-[14px] border-[1px] ${isInputDisabledOriginChain ? 'border-none' : 'border-[#D9D9D9DD]'} placeholder-gray-300 border-dashed p-1 focus:outline-none focus:scale-105 duration-500 w-[140px]`}
                        ></input>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DraftOrigindataCard