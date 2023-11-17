import { useState, useEffect } from 'react'
import { CircularProgress } from '@mui/material'
import Conectwalet from '../component/Connectwallet'
import Stepper2 from '../component/Stepper2'
import GobackButtonNoNavigate from '../component/GobackButtonNoNavigate'
import GobackButtonValidate from '../component/GobackButtonValidate'
import Darkbg from '../component/Alert/Darkbg'

import { useNavigate } from 'react-router-dom';

import WhiteBox from '../component/WhiteBox'
import InputBoxforNP5 from '../component/InputBoxforNP5'
import BoxButton from '../component/BoxButton'
import Help from '../component/Alert/Help'
import axios from 'axios'
//Redux
import { useSelector } from "react-redux";
import {
    walletcounterSelector
} from "../store/slices/walletcounterSlice";
import { getAccessTokenFromLocalStorage, getSCHEMA_CODE, saveSCHEMA_CODE } from '../helpers/AuthService'
import Swal from 'sweetalert2'
//Redux



const NewIntregation5 = () => {
    //Redux

    const walletcounterReducer = useSelector(walletcounterSelector);


    const [text, setText] = useState([

        {
            Name: "Schema code",
            placeholder: "sixnetwork.whalegate",
            value: "",
            require: true,
            Error: true,
        },
        {
            Name: "Collection name",
            placeholder: "whalegate",
            value: "",
            require: false,
            Error: true,
        },
        {
            Name: "Description",
            placeholder: "WhaleGate Gen2 NFT With SIX",
            value: "",
            require: false,
            Error: true,
        },

    ]);
    const [currentState, setCurrentState] = useState(1)
    const [isLoading, setisLoading] = useState(false)
    const [isLoadingHistory, setIsLoadingHistory] = useState(false)
    const [isValidate, setisValidate] = useState(false)
    const [Next, setNext] = useState(false)
    const navigate = useNavigate();
    const [isError, setisError] = useState(false)
    const [isError1, setisError1] = useState(false)
    const [isError2, setisError2] = useState(false)
    const [schemaCode, setschemaCode] = useState('')
    const [collectionName, setcollectionName] = useState('')
    const [isSpace1, setisSpace1] = useState(false)
    const [isSpace2, setisSpace2] = useState(false)
    const [isDuplicateShemaCode, setisDuplicateShemaCode] = useState(false);


    const handleInputschemaCode = (e) => {
        setschemaCode(e.target.value);
        handleReset()

    };
    const handleInputcollectionName = (e) => {
        setcollectionName(e.target.value);
        handleReset()
    };

    const handleReset = () => {
        setisError(false);
        setisSpace1(false);
        setisSpace2(false);
        setplaceHolderColor1("white")
        setplaceHolderColor2("white")
        document.getElementById("img1").style.zIndex = "10";
        document.getElementById("img2").style.zIndex = "10";
    }

    // const handleFucuscollectionName = () => {
    //     setisError(false); setisError2(false); setisError1(false)
    // }
    // const checkInput = ()=>{
    //     if(this.)
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if ((schemaCode.length > 0 && !schemaCode.includes(' ')) && (collectionName.length > 0 && !collectionName.includes(' '))) {
            navigate('/newintregation/6');
        }
        // if(schemaCode.includes(' ') || collectionName.includes(' ')  ){
        //     console.log('SPACEBARrrrrrrrrrrrrrrrrrr')
        // }
        else if (((schemaCode.length == 0 || schemaCode.includes(' ')) && (collectionName.length > 0 && !collectionName.includes(' ')))) {
            setisError1(true)
            setisError(true)
            setplaceHolderColor1("red")
            document.getElementById("img2").style.zIndex = "0";
        }
        else if (((collectionName.length == 0 || collectionName.includes(' ')) && (schemaCode.length > 0 && !schemaCode.includes(' ')))) {
            setisError2(true)
            setisError(true)
            setplaceHolderColor2("red")
            document.getElementById("img1").style.zIndex = "0";
        }
        else {
            setisError1(true)
            setisError2(true)
            setisError(true)
            setplaceHolderColor1("red")
            setplaceHolderColor2("red")
        }
        console.log('submit success')
        if (schemaCode.includes(' ')) {
            setisSpace1(true)
        }
        if (collectionName.includes(' ')) {
            setisSpace2(true)
        }
    };

    const createSchemaCode = async () => {
        const apiUrl = `${import.meta.env.VITE_APP_API_ENDPOINT_SCHEMA_INFO}schema/create_schema_info`;
        const requestData = {
            "schema_name": `${text[0].value}`,
            "status": "Draft",
            "current_state": "1",
            "description": `${text[2].value}`,
            "collection_name": `${text[1].value}`,
        };

        axios.post(apiUrl, requestData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAccessTokenFromLocalStorage()}`,  // Set the content type to JSON
                // Add any other headers your API requires
            },
        })
            .then(response => {
                console.log('API Response:', response.data);
                saveSCHEMA_CODE(response.data.data.schema_code);
                console.log("saveSCHEMA_CODE : ", response.data.data.schema_code)
                // console.log(requestData)
                // You can handle the API response here
            })
            .catch(error => {
                console.error('API Error:', error);
                // Handle errors here
            });
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
                setCurrentState(response.data.data.schema_info.current_state)
                updatedText[0].value = response.data.data.schema_info.schema_info.code;
                updatedText[1].value = response.data.data.schema_info.schema_info.name;
                updatedText[2].value = response.data.data.schema_info.schema_info.description;
                console.log(text)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        setIsLoadingHistory(false)
        console.log( "Text 2",text)
    }


    useEffect(  () => {
        console.log("SCHEMACODE:", getSCHEMA_CODE())
        if (getSCHEMA_CODE()) {
            console.log( "Text 1",text)
            GethistoryFormSchemaCode();
        }
    }, []);

    const UpdateSchemaInfo = () => {
        const apiUrl = `${import.meta.env.VITE_APP_API_ENDPOINT_SCHEMA_INFO}schema/set_schema_info`;
        const requestData = {
            "payload": {
                "schema_info": {
                    "name": `${text[1].value}`,
                    "description": `${text[2].value}`,
                    "owner": walletcounterReducer.cosmosaddress,
                    "code": `${text[0].value}`,
                },
                "schema_code": getSCHEMA_CODE(),
                "status": "Draft",
                "current_state": "1"
            }
        };

        axios.post(apiUrl, requestData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAccessTokenFromLocalStorage()}`,  // Set the content type to JSON
                // Add any other headers your API requires
            },
        })
            .then(response => {
                console.log('API Response UpdateSchemaInfo:', response.data);
                // console.log("requestData :", requestData)
                navigate('/newintregation/6')
                // saveSCHEMA_CODE(response.data.data.update_schema.schema_info.code);
                // console.log("getSCHEMA_CODE() : ", getSCHEMA_CODE())

                // console.log(requestData)
                // You can handle the API response here
            })
            .catch(error => {
                console.error('API Error:', error);
                // Handle errors here
            });
    }

    const handleNext = async () => {
        await setNext(true);
        const allErrorsTrue = text.every(item => item.Error === true);
        if (allErrorsTrue) {
            if (!getSCHEMA_CODE()) {
                Swal.fire({
                    title: 'Are you sure to create ?',
                    text: "",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#7A8ED7',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, create '
                }).then( async (result) => {
                    if (result.isConfirmed) {
                        Swal.fire(
                            'Create Complete!',
                            'Your Schema code has been Created.',
                            'success'
                        )
                        setNext(true);
                        await createSchemaCode();
                        navigate('/newintregation/6')
                    }
                })
            } else {
                UpdateSchemaInfo()
            }
        } else {
            setNext(true);
            setisError(true)
        }
    }

    const FindSchemaCode = async () => {
        const updatedText = [...text];
        updatedText[0].duplicate = true;
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
                console.log('Response:', response.data.data.status);
                if (!response.data.data.status) {
                    const updatedText = [...text];
                    updatedText[0].duplicate = response.data.data.status;
                }
                setisValidate(true)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        setisLoading(false)
    }


    return (
        <div className='w-full flex justify-center ' >
            <div className='w-full h-full fixed  flex justify-center items-center bg-gradient-24  from-white to-[#7A8ED7]'>
                <div className='w-[1280px] h-[832px] bg-gradient-24 to-gray-700 from-gray-300 rounded-2xl flex justify-between p-4 shadow-lg shadow-black/20 dark:shadow-black/40'>
                    <div className='w-full h-full flex flex-col justify-between'>
                        {!isLoadingHistory &&
                            <div className=''>
                                <div className='flex flex-rows justify-between'>
                                    <Stepper2 ActiveStep={1} CurrentState={currentState}></Stepper2>
                                </div>
                                <div className='w-[931px] h-[1px] bg-[#D9D9D9]'></div>
                            </div>
                        }
                        {!isLoadingHistory &&
                            <div className=' flex flex-col justify-between items-center py-[5%] h-4/6 relative '>
                                {text.map((item, index) => (
                                    <InputBoxforNP5
                                        Next={Next}
                                        index={index}
                                        text={text}
                                        setisError={setisError}
                                        isDuplicateShemaCode={isDuplicateShemaCode}
                                        setisDuplicateShemaCode={setisDuplicateShemaCode}
                                        FindSchemaCode={FindSchemaCode}
                                        InitialData={[text[0].value, text[1].value, text[2].value]}
                                    >
                                    </InputBoxforNP5>
                                ))}
                                {isLoading &&
                                    <div className=' absolute ml-[52%] mt-[4%] scale-50'>
                                        <CircularProgress className=" text-white" sx={{
                                            width: 100,
                                            color: 'white',
                                        }}
                                        ></CircularProgress>
                                    </div>
                                }
                            </div>
                        }
                        {isLoadingHistory &&
                            <div className=' w-full h-full flex justify-center items-center scale-[500%]'>
                                <CircularProgress className=" text-white" sx={{
                                    width: 1000,
                                    color: 'white',
                                }}
                                ></CircularProgress>
                            </div>
                        }
                        <div className=' w-full flex justify-start  '>
                            <GobackButtonValidate BackPage={'/'} goBackCondition={(text[0].value === "" && text[1].value === "" && text[2].value === "")}></GobackButtonValidate>
                        </div>
                    </div>
                    <div className='h-5/6 flex flex-col items-end '>
                        <Conectwalet></Conectwalet>
                        <WhiteBox
                            Title={'Schema Code'}
                            DeTail={'A schema code serves as an identifier for your Gen 2 NFT definition. It can be in a formatted or free-text format. In the case of a formatted code, the initial set of characters before the full stop (".") represents your organization code. This organization code is unique to you and enables you to create other schemas using the same code.'}
                            Height={414} Width={266} TitleSize={20} DetailSize={15}>
                        </WhiteBox>
                        <WhiteBox
                            Title={'Collection Name'}
                            DeTail={'The term "Collection name" is exclusively used within the SIX Protocol Ecosystem (Gen2 Studio, SIX Scan, etc.) and does not refer to the actual collection name.'}
                            Height={414} Width={266} TitleSize={20} DetailSize={15}>
                        </WhiteBox>
                        <div onClick={() => { handleNext(); }} className=' w-full h-full flex justify-center items-end  mt-8'>
                            <BoxButton BorderRadius={0} FontSize={30} TextTitle={'NEXT'}></BoxButton>
                        </div>
                        <div className=' w-full h-full flex justify-end items-end '>
                            <Help></Help>
                        </div>
                    </div>
                </div>
                {isError &&
                    <div className='absolute duration-500' onClick={handleReset}>
                        <Darkbg ></Darkbg>
                        {/* <AlertCard BG={1} ML={250} MT={-150} Width={300} Height={150} heaDer="Error" detailsText="This code has already been taken or include space , empthy text."  ></AlertCard> */}
                    </div>
                }
            </div>
        </div>
    )
}

export default NewIntregation5