import React, { useCallback, useEffect, useRef, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from 'sweetalert2';
import axios from 'axios';
import { getAccessTokenFromLocalStorage } from '../helpers/AuthService';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import NormalButton from './NormalButton';
import GobackButtonValidate from './GobackButtonValidate';

interface ComponentProps {
    Title: string[]
    Discard: boolean
    Save: boolean
}

function DraftOrigindataCard(Props: ComponentProps) {
    const [isLoading, setisLoading] = useState(false)
    const navigate = useNavigate();
    const { schema_revision } = useParams();
    const [loading, setLoading] = useState(false)
    const [isInputDisabledOriginChain, setisInputDisabledOriginChain] = useState(true)
    const [isInputDisabledCollectionData, setisInputDisabledCollectionData] = useState(true)
    const [schemaInfo, setschemaInfo] = useState({})
    const [FirstschemaInfo, setFirstschemaInfo] = useState({})
    const [selectedNetwork, setSelectedNetwork] = useState('1');

    const handleRefresh = () => {
        window.location.reload();
    };

    const resetSchemaInfo = () => {

        if (JSON.stringify(FirstschemaInfo) !== JSON.stringify(schemaInfo)) {
            Swal.fire({
                title: 'Are you sure to reset data ?',
                text: "Your draft will be reset",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#7A8ED7',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, reset '
            }).then((result) => {
                if (result.isConfirmed) {
                    setschemaInfo(FirstschemaInfo);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Reset Complete!",
                        text: "Your data has been reseted",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
        } else {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Reset Complete!",
                text: "Your data has been reseted",
                showConfirmButton: false,
                timer: 1500
            });
        }


    }

    const FindSchemaCode = async () => {

        setisLoading(true)
        const apiUrl = `${import.meta.env.VITE_APP_API_ENDPOINT_SCHEMA_INFO}schema/validate_schema_code`;
        const params = {
            schema_code: `${text[0].value}`,
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
                if (!response.data.data.status) {
                    const updatedText = [...text];
                    updatedText[0].duplicate = response.data.data.status;
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        setisLoading(false)
    }


    const saveData = async () => {

        const apiUrl = `${import.meta.env.VITE_APP_API_ENDPOINT_SCHEMA_INFO}schema/set_schema_info`;

        const requestData = {
            "payload": {
                "schema_info": schemaInfo.schema_info,
                "schema_code": schemaInfo.schema_code,
                "status": "Draft",
                "current_state": "0"
            }
        }

        Swal.fire({
            title: 'Are you sure to save data ?',
            text: "Your data will be save",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#7A8ED7',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, save '
        }).then(async (result) => {
            if (result.isConfirmed) {
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
        })
    }

    const findSchemaCode = async () => {
        setLoading(false)
        const apiUrl = `${import.meta.env.VITE_APP_API_ENDPOINT_SCHEMA_INFO}schema/get_schema_info/${schema_revision}`;
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
                console.log("SchemaInFo FindSchemaCode :", response.data.data.schema_info)
                setschemaInfo({ ...response.data.data.schema_info });
                setFirstschemaInfo({ ...response.data.data.schema_info });
            })
            .catch((error) => {
                console.error("Error:", error);
            });

        setLoading(true)
    };

    useEffect(() => {
        findSchemaCode();

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

    const handleChangeValue = (str, stateVariable) => {
        setschemaInfo((prevState) => {
            console.log("PPPP::", prevState)
            const newState = JSON.parse(JSON.stringify(prevState));

            if (stateVariable === "schema_info.origin_data.origin_base_uri") {
                newState.schema_info.origin_data.origin_base_uri = str;
            } else if (stateVariable === "schema_info.origin_data.origin_contract_address") {
                newState.schema_info.origin_data.origin_contract_address = str;
            } else if (stateVariable === "schema_info.schema_name") {
                newState.schema_info.code = str;
            } else if (stateVariable === "schema_info.schema_info.name") {
                newState.schema_info.name = str;
            } else if (stateVariable === "schema_info.schema_info.description") {
                newState.schema_info.description = str;
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

    const getBaseURIFromContract = async () => {
        setisLoading(true)
        const apiUrl = `${import.meta.env.VITE_APP_API_ENDPOINT_SCHEMA_INFO}schema/base_uri_from_contract`; // Replace with your API endpoint
        const params = {
            contract_address: `${schemaInfo.schema_info.origin_data.origin_contract_address}`,
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
                if (response.data.statusCode === "V:0001") {
                    handleChangeValue(response.data.data.base_uri, "schema_info.origin_data.origin_base_uri");
                }
                else {
                    handleChangeValue("", "schema_info.origin_data.origin_base_uri");
                }
            })
            .catch((error) => {
                // Handle errors here
                console.error('Error:', error);
            });
        setisLoading(false)
    }

    const log = () => {
        console.log("schemaInfo:", schemaInfo, "FirstschemaInfo :")
    }

    return (
        <div className=' w-full h-full flex flex-col justify-center items-center'>
            {loading && (
                <div className=' mt-10 w-[90%]  h-64 border border-white rounded-xl p-5 relative'>
                    <div
                        onClick={() => { setisInputDisabledCollectionData(!isInputDisabledCollectionData); console.log(FirstschemaInfo, schemaInfo); console.log(FirstschemaInfo === schemaInfo) }}
                        className=' flex justify-center items-center absolute right-2 top-2 border-white border rounded-full w-10 h-10 hover:scale-105 duration-500 cursor-pointer ' >
                        <EditIcon></EditIcon>
                    </div>
                    <h1 className=' text-3xl '>{Props.Title[0]}</h1>

                    <div className=' m-5 flex justify-between w-full flex-col'>
                        <div className=' h-10 flex  justify-start items-center'>
                            <p className="font-bold text-xl mr-4">Schema Code : </p>
                            <input
                                value={schemaInfo.schema_info.code}
                                type="text"
                                disabled={isInputDisabledCollectionData}
                                onChange={(e) => {
                                    handleChangeValue(e.target.value, "schema_info.schema_name");
                                }}
                                className={` w-[20%]  bg-transparent text-[14px] border-[1px] ${isInputDisabledCollectionData ? 'border-none' : 'border-[#D9D9D9DD]'} placeholder-gray-300 border-dashed  p-1 focus:outline-none focus:scale-105  `}
                            ></input>
                        </div>
                        <div className=' h-10 flex  justify-start items-center mt-5'>
                            <p className="font-bold text-xl mr-4">Collection Name : </p>
                            <input
                                value={schemaInfo.schema_info.name}
                                type="text"
                                disabled={isInputDisabledCollectionData}
                                onChange={(e) => {
                                    handleChangeValue(e.target.value, "schema_info.schema_info.name");
                                }}
                                className={` w-[30%] bg-transparent text-[14px] border-[1px] ${isInputDisabledCollectionData ? 'border-none' : 'border-[#D9D9D9DD]'} placeholder-gray-300 border-dashed p-1 focus:outline-none focus:scale-105  w-[140px]`}
                            ></input>
                        </div>
                        <div className=' h-10 flex  justify-start  items-center mt-5'>
                            <p className="font-bold text-xl mr-4">Description : </p>
                            <input
                                value={schemaInfo.schema_info.description}
                                type="text"
                                disabled={isInputDisabledCollectionData}
                                onChange={(e) => {
                                    handleChangeValue(e.target.value, "schema_info.schema_info.description");
                                }}
                                className={`w-[50%] bg-transparent text-[14px] border-[1px] ${isInputDisabledCollectionData ? 'border-none' : 'border-[#D9D9D9DD]'} placeholder-gray-300 border-dashed p-1 focus:outline-none focus:scale-105  w-[140px]`}
                            ></input>
                        </div>
                    </div>
                </div>
            )}

            {loading && (
                <div className=' mt-10 w-[90%] border border-white rounded-xl p-5 relative'>
                    <div
                        onClick={() => setisInputDisabledOriginChain(!isInputDisabledOriginChain)}
                        className=' flex justify-center items-center absolute right-2 top-2 border-white border rounded-full w-10 h-10 hover:scale-105 duration-500 cursor-pointer ' >
                        <EditIcon></EditIcon>
                    </div>
                    <h1 className=' text-3xl '>{Props.Title[1]}</h1>

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
                        <div className=' h-10 flex  justify-start items-center mt-5'>
                            <p className="font-bold text-xl mr-6">Origin Contract Address : </p>
                            <input
                                value={schemaInfo.schema_info.origin_data.origin_contract_address}
                                type="text"
                                disabled={isInputDisabledOriginChain}
                                onChange={async (e) => {
                                    await handleChangeValue(e.target.value, "schema_info.origin_data.origin_contract_address");
                                    getBaseURIFromContract();
                                }}
                                className={` w-[50%] bg-transparent text-[14px] border-[1px] ${isInputDisabledOriginChain ? 'border-none' : 'border-[#D9D9D9DD]'} placeholder-gray-300 border-dashed p-1 focus:outline-none focus:scale-105 w-[140px]`}
                            ></input>
                        </div>
                        <div className=' h-10 flex  justify-start items-center mt-5'>
                            <p className="font-bold text-xl mr-6">Origin Base URI : </p>
                            <input
                                value={schemaInfo.schema_info.origin_data.origin_base_uri}
                                type="text"
                                disabled={isInputDisabledOriginChain}
                                onChange={(e) => {
                                    handleChangeValue(e.target.value, "schema_info.origin_data.origin_base_uri");
                                }}
                                className={` w-[70%] bg-transparent text-[14px] border-[1px] ${isInputDisabledOriginChain ? 'border-none' : 'border-[#D9D9D9DD]'} placeholder-gray-300 border-dashed p-1 focus:outline-none focus:scale-105 w-[140px]`}
                            ></input>
                        </div>
                    </div>
                </div>
            )}

            {loading && (
                <div className="  h-[7%] mt-4 items-center w-full flex justify-center gap-x-8">
                    <div className="w-32" onClick={() => { saveData() }} >
                        <NormalButton
                            TextTitle="SAVE"
                            BorderRadius={0}
                            FontSize={24}
                        ></NormalButton>
                    </div>
                    <div className="w-32" onClick={() => { resetSchemaInfo() }} >
                        <NormalButton
                            TextTitle="RESET"
                            BorderRadius={0}
                            FontSize={24}
                        ></NormalButton>
                    </div>
                </div>
            )}

            {!loading &&
                <div className=' mt-[23%] w-full h-full flex justify-center items-center scale-[500%]'>
                    <CircularProgress className=" text-white" sx={{
                        width: 1000,
                        color: 'white',
                    }}
                    ></CircularProgress>
                </div>
            }
            <div className='  flex justify-start absolute left-0 bottom-0 '>
                <GobackButtonValidate BackPage={'/'} goBackCondition={(JSON.stringify(FirstschemaInfo) === JSON.stringify(schemaInfo))} ></GobackButtonValidate>
            </div>
        </div>
    )
}

export default DraftOrigindataCard