import { useState, useRef } from 'react'
import { Button } from '@mui/material'
import Conectwalet from '../component/Connectwallet'
import Stepper2 from '../component/Stepper2'
import { Link, Navigate } from 'react-router-dom'
import Darkbg from '../component/Alert/Darkbg'
import AlertCard from '../component/Alert/AlertCard'
import RedAleart from '../component/Alert/RedAleart'
import { useNavigate } from 'react-router-dom';
import GobackButton from '../component/GobackButton'
import NextPageButton from '../component/NextPageButton'


const NewIntregation5 = () => {

    const myElementRef = useRef(null);

    const navigate = useNavigate();
    
    const [isError, setisError] = useState(false)
    const [isError1, setisError1] = useState(false)
    const [isError2, setisError2] = useState(false)
    const [schemaCode, setschemaCode] = useState('')
    const [collectionName, setcollectionName] = useState('')
    const [isSpace1, setisSpace1] = useState(false)
    const [isSpace2, setisSpace2] = useState(false)

    const [placeHolderColor1,setplaceHolderColor1] = useState("white")
    const [placeHolderColor2,setplaceHolderColor2] = useState("gray")

    const handleInputschemaCode = (e) => {
        setschemaCode(e.target.value);
        console.log(e.target.value)
        handleReset()
    };
    const handleInputcollectionName = (e) => {
        setcollectionName(e.target.value);
        console.log(e.target.value)
        handleReset()
    };

    const handleReset = () => {
        setisError(false);
        setisError2(false);
        setisError1(false);
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
                console.log('1')
        }
        // if(schemaCode.includes(' ') || collectionName.includes(' ')  ){
        //     console.log('SPACEBARrrrrrrrrrrrrrrrrrr')
        // }
        else if (((schemaCode.length == 0 || schemaCode.includes(' ')) && (collectionName.length > 0 && !collectionName.includes(' ')))) {
            setisError1(true)
            setisError(true)
            setplaceHolderColor1("red")
            console.log('2')
            document.getElementById("img2").style.zIndex = "0";
        }
        else if (((collectionName.length == 0 || collectionName.includes(' ')) && (schemaCode.length > 0 && !schemaCode.includes(' ')))) {
            setisError2(true)
            setisError(true)
            setplaceHolderColor2("red")
            console.log('3')
            document.getElementById("img1").style.zIndex = "0";
        }
        else {
            setisError1(true)
            setisError2(true)
            setisError(true)
            setplaceHolderColor1("red")
            setplaceHolderColor2("red")
            console.log('4')
        }
        console.log('submit success')
        if(schemaCode.includes(' ')){
            setisSpace1(true)
        }
        if(collectionName.includes(' ')){
            setisSpace2(true)  
        }
    };
    return (
        <div className='w-full flex justify-center ' >
            <div className='w-full h-full fixed  flex justify-center items-center bg-gradient-24  from-white to-[#7A8ED7]'>
                <div className='w-[1280px] h-[832px] bg-gradient-24 to-gray-700 from-gray-300 rounded-2xl flex justify-between p-4 shadow-lg shadow-black/20 dark:shadow-black/40'>
                    <div className='w-full h-full px-[20px] flex flex-col justify-between'>
                        <div>
                            <div className='flex flex-rows justify-between'>
                                <Stepper2 ActiveStep={1}></Stepper2>
                            </div>
                            <div className='w-[931px] h-[1px] bg-[#D9D9D9]'></div>
                        </div>
                        <form onSubmit={handleSubmit} className=' flex flex-col justify-between items-center mt-[100px] h-4/6 '>
                            <div id="img1" className=' w-[658px] h-[121px] border-[1px] border-white rounded-xl p-2 flex  items-center justify-center z-10'>
                                <p className='font-bold text-[24px] mr-10'>Schema code</p>
                                <input onChange={handleInputschemaCode} onFocus={handleReset} type="text" placeholder="sixnetwork.whalegate" className={`placeholder-${placeHolderColor1}-600 bg-transparent text-[24px] border-[1px] border-[#D9D9D9DD] border-dashed p-1 z-50 focus:outline-none focus:scale-105 duration-1000`}></input>
                                <div className='w-[15px] h-[15px] bg-[#D9D9D9] rounded-full absolute ml-[630px] mb-[90px]'></div>
                            </div>
                            <div id="img2" className='w-[658px] h-[121px] border-[1px] border-white rounded-xl p-2 flex  items-center justify-center z-10 '>
                                <p className='font-bold text-[24px] mr-10'>Collection name</p>
                                <input onChange={handleInputcollectionName} onFocus={handleReset} type="text" placeholder="WHALEGATE" className={`placeholder-${placeHolderColor2}-600 bg-transparent text-[24px] border-[1px] border-[#D9D9D9DD] border-dashed p-1  focus:outline-none focus:scale-105 duration-1000`}></input>
                                <div className='w-[15px] h-[15px] bg-[#D9D9D9] rounded-full absolute ml-[630px] mb-[90px]'></div>
                            </div>
                            {/* <Link to={`/newintregation/6`} > */}
                            <Button type='submit' variant="outlined"
                                style={{
                                    borderRadius: 0,
                                    color: 'white',
                                    borderColor: 'white',
                                    padding: "10px 36px",
                                    fontSize: "68px",
                                }}
                            >NEXT</Button>
                            {/* </Link> */}
                            
                            

                        </form>
                        <div className=' w-full flex justify-start  '>
                            <div className={`scale-50`}>
                                <GobackButton BackPage='/newintregation/4'></GobackButton>
                            </div>
                        </div>
                    </div>
                    <div className='w-2/6 h-5/6 flex flex-col items-end   '>
                        <Conectwalet></Conectwalet>
                        <div className='w-[266px] h-[414px] border-[1px] border-white rounded-xl mt-[30px] flex flex-col items-center py-[10px]  '>
                            <p className='text-[24px] w-[231px] font-bold text-white'>Schema Code</p>
                            <p className='text-[14px] w-[216px]  text-white pt-[10px]'>A schema code serves as an identifier for your Gen 2 NFT definition. It can be in a formatted or free-text format. In the case of a formatted code, the initial set of characters before the full stop (".") represents your organization code. This organization code is unique to you and enables you to create other schemas using the same code.</p>
                        </div>
                        <div className='w-[266px] h-[240px] border-[1px] border-white rounded-xl mt-[30px] flex flex-col items-center py-[15px]'>
                            <p className='text-[24px] w-[231px] font-bold text-white'>Collection Name</p>
                            <p className='text-[14px] w-[216px]  text-white pt-[20px]'>The term "Collection name" is exclusively used within the SIX Protocol Ecosystem (Gen2 Studio, SIX Scan, etc.) and does not refer to the actual collection name.</p>
                        </div>
                    </div>
                </div>
                {isError &&
                    <div className='absolute duration-500' onClick={handleReset}>
                        <Darkbg ></Darkbg>
                        <AlertCard BG={1} ML={250} MT={-150} Width={300} Height={150} heaDer="Error" detailsText="This code has already been taken or include space , empthy text."  ></AlertCard>
                        {isError1 && <RedAleart Height={20} Width={120} Rotate={90} ML={145} MT={-147} detailsText={!isSpace1 ? "Require" : "Inclued Space"} ></RedAleart>}
                        {isError2 && <RedAleart Height={20} Width={120} Rotate={90} ML={145} MT={36} detailsText={!isSpace2 ? "Require" : "Inclued Space"}></RedAleart> }
                    </div>
                }
            </div>
        </div>
    )
}

export default NewIntregation5